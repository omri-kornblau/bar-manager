const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const { internals } = require("../models/attachment");

const {
  writerFile,
  findByIds,
  prepareRequests,
  getClient,
} = require("./utils");

const {
  createRequest,
  deleteRequestById,
  findRequestById,
  updateRequestById,
  updateFirstAcceptById,
  updateSecondAcceptById
} = require("../db/request");
const {
  addRequestToClientById,
  removeRequestFromClientById
} = require("../db/client");
const {
  createSampledFromRequest
} = require("../db/sampledRequest");


const {
  REQUEST_STATUSES,
} = require("../config/types")
const {
  ALLOW_UPDATE_STATUSES,
  STATUS_UPDATE_ALLOWED_FIELDS,
  ALLOW_ACCEPT_CANCEL_STATUSES,
} = require("../config/consts");

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  const requests = await prepareRequests(await findByIds(RequestModel, client.requests, "Request not found"));
  const oldRequests = await prepareRequests(await findByIds(OldRequestModel, client.oldRequests, "Old request not found"));
  const notifications = await findByIds(NotificationModel, client.unreadNotifications, "Unread notification not found");

  res.send({ requests, oldRequests, notifications });
}

exports.createRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    policy,
    extraFiles,
  } = req.body;

  const { Attachment } = internals;

  const [user, client] = await getClient(username);

  if (!_.isArray(policy) || policy.length != 1) {
    throw Boom.badRequest("Policy file must be provided");
  }

  if (!_.isArray(extraFiles)) {
    throw Boom.badRequest("Extra files must be provided");
  }

  const filesIds = await Promise.all([policy[0], ...extraFiles].map(file =>
    writerFile(Attachment, file)
  ));

  req.body.policy = filesIds[0];
  req.body.extraFiles = filesIds.slice(1);

  const createdRequest = await createRequest({
    author: user._id,
    status: REQUEST_STATUSES[0],
    index: client.requests.length + client.oldRequests.length,
    ...req.body
  });

  try {
    await addRequestToClientById(user.clientId, createdRequest._id);
  } catch (err) {
    await deleteRequestById(createdRequest._id);

    filesIds.forEach(fileId =>
      Attachment.unlink({ _id: fileId }, err => {
        if (!_.isNil(err)) {
          console.error("Failed deleting file", fileId, err);
        }
      })
    )

    console.error("Failed updating client after creating request");
    throw Boom.internal(err);
  }

  res.status(200).send(createdRequest);
}

exports.updateRequest = async (req, res) => {
  const {
    username
  } = req
  const data = req.body;

  const {
    _id
  } = data;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id) && !client.oldRequests.includes(_id)) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_UPDATE_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  const cleanData = _.pick(data, STATUS_UPDATE_ALLOWED_FIELDS[data.status]);
  const updatedRequest = await updateRequestById(_id, cleanData, true);

  res.send(updatedRequest);
}

exports.acceptRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    _id,
  } = req.body;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id) && !client.oldRequests.includes(_id)) {
    throw Boom.badRequest("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_ACCEPT_CANCEL_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  const { firstAccept, secondAccept } = currentRequest;
  let updatedRequest;
  if (firstAccept === "") {
    updatedRequest = await updateFirstAcceptById(_id, user._id)
  } else if (secondAccept === "") {
    updatedRequest = await updateSecondAcceptById(_id, user._id)
    // TODO: Handle throw here
    await createSampledFromRequest(updatedRequest);
  } else {
    throw Boom.badRequest("Cannot update request with current accepts statuses");
  }

  res.send(updatedRequest);
}

exports.cancelRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    _id,
  } = req.body;
  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id) && !client.oldRequests.includes(_id)) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_ACCEPT_CANCEL_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot cancel request with such status");
  }

  await removeRequestFromClientById(client._id, _id);
  await deleteRequestById(_id);

  [currentRequest.policy, ...currentRequest.extraFiles].forEach(fileId =>
    Attachment.unlink({_id: fileId}, err => {
      if (!_.isNil(err)) {
        console.error("Failed deleting file", fileId, err);
      }
  }));

  res.sendStatus(204);
}

exports.downloadFile = async (req, res) => {
  const {
    username
  } =  req;

  const {
    requestId,
    fileId,
  } = req.query;
  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(requestId) && !client.oldRequests.includes(requestId)) {
    throw Boom.badRequest("Request not belong to client");
  }

  const request = await findRequestById(requestId)
  if (!request.extraFiles.includes(fileId) && fileId !== request.policy) {
    throw Boom.badRequest("File not belong to request")
  }

  const file = await Attachment.findById(fileId);
  if (_.isNil(file)) {
    throw Boom.internal("File not found");
  }

  const readStream = Attachment.read({_id: Mongoose.mongo.ObjectID(fileId)});
  res.set("Content-Type", "application/octet-stream");
  res.set("Content-Disposition", `attachment; filename=\"${file.filename}\"`);
  readStream.pipe(res);
}
