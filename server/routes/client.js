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
  prepareNotifications,
  getClient,
  getProvider,
  prepareRequestsMessages,
  createProviderNotification,
} = require("./utils");

const {
  createRequest,
  deleteRequestById,
  findRequestById,
  findRequestByExtraFileId,
  updateRequestFieldsById,
  removeFileFromExtraFiles,
  addMessage: addMessageToRequest
} = require("../db/request");
const {
  addRequestToClientById,
  removeRequestFromClientById,
  readNotificationInClientById,
} = require("../db/client");
const {
  createSampledFromRequest
} = require("../db/sampledRequest");
const {
  readNotification,
} = require("../db/notification")
const {
  readNotificationInProviderById,
} = require("../db/provider");
const {
  addMessage
} = require("../db/message");
const {
  findFileById,
} = require("../db/attachment");


const {
  REQUEST_STATUSES,
} = require("../config/types")
const {
  ALLOW_UPDATE_STATUSES,
  STATUS_UPDATE_ALLOWED_FIELDS,
  ALLOW_ACCEPT_CANCEL_STATUSES,
} = require("../config/consts");
const { findProviderById } = require("../db/provider");

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  const requests = await prepareRequests(await findByIds(RequestModel, client.requests, "Request not found"));
  const oldRequests = await prepareRequests(await findByIds(OldRequestModel, client.oldRequests, "Old request not found"));
  const notifications = await prepareNotifications(await findByIds(NotificationModel, client.unreadNotifications, "Unread notification not found"));

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

exports.sendMessage = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    providerId,
    body,
  } = req.body;

  const provider = await findProviderById(providerId);
  if (_.isNil(provider)) {
    throw Boom.badRequest("No such provider");
  }

  const [user, client] = await getClient(username)
  const message = await addMessage(body, client._id);

  let request;
  try {
    request = await addMessageToRequest(requestId, message._id, providerId);
    await createProviderNotification({
      type: "New Message",
      from: client.name
    }, requestId, providerId)
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeMessageFromRequest(requestId, message._id, providerId);
      }
      await deleteMessage(message._id);
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send(message);
}

exports.updateRequest = async (req, res) => {
  const {
    username
  } = req
  const data = req.body;

  const {
    _id,
    policy,
    extraFiles,
  } = data;

  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id) && !client.oldRequests.includes(_id)) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_UPDATE_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  if (_.isArray(policy) && policy.length > 0) {
    data.policy = await writerFile(Attachment, policy[0]);;
  } else {
    delete data.policy;
  }

  const filesIds = await Promise.all(extraFiles
    .filter(file => !_.isNil(file.content))
    .map(file =>
      writerFile(Attachment, file)
  ));

  data.extraFiles = data.extraFiles.
    filter(
      file => !_.isNil(file._id)
    ).map(
      file => file._id
    ).concat(filesIds);

  const cleanData = _.pick(data, STATUS_UPDATE_ALLOWED_FIELDS[data.status]);
  const updatedRequest = await updateRequestFieldsById(_id, cleanData, true);

  res.send({...cleanData, extraFiles});
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

  let user;
  let client;
  try {
    [user, client] = await getClient(username);
  } catch {
    [user, client] = await getProvider(username);
  }

  if (!client.requests.includes(requestId)
  && !client.oldRequests.includes(requestId)) {
    throw Boom.badRequest("Request not belong to client or provider");
  }

  const request = await findRequestById(requestId)
  if (!request.extraFiles.includes(fileId) && fileId !== request.policy) {
    throw Boom.badRequest("File not belong to request")
  }

  const file = await findFileById(fileId);

  const readStream = Attachment.read({_id: Mongoose.mongo.ObjectID(fileId)});
  res.set("Content-Type", "application/octet-stream");
  res.set("Content-Disposition", `attachment; filename=\"${file.filename}\"`);
  readStream.pipe(res);
}

exports.deleteFile = async (req, res) => {
  const {
    username
  } =  req;

  const {
    fileId,
  } = req.body;
  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  const request = await findRequestByExtraFileId(fileId);
  if (!client.requests.includes(request._id)
  && !client.oldRequests.includes(request._id)) {
    throw Boom.badRequest("Request not belong to client");
  }

  if (request.extraFiles.length === 1) {
    throw Boom.unauthorized("Extra files must include atleast one file");
  }

  await removeFileFromExtraFiles(request._id, fileId);
  Attachment.unlink({_id: fileId}, err => {
    if (!_.isNil(err)) {
      console.error("Failed deleting file", fileId, err);
    }
  });

  res.sendStatus(204);
}

exports.readNotification = async (req, res) => {
  const {
    username
  } =  req;

  const {
    notificationId,
  } = req.body;

  let user;
  let client;
  let type;
  try {
    [user, client] = await getClient(username);
    type = "client";
  } catch {
    [user, client] = await getProvider(username);
    type = "provider";
  }

  if (!client.unreadNotifications.includes(notificationId)) {
    throw Boom.badRequest("Notification not belong to client");
  }

  await readNotification(notificationId, true)
  try {
    if (type === "client") {
      await readNotificationInClientById(client._id, notificationId);
    } else {
      await readNotificationInProviderById(client._id, notificationId);
    }
  } catch (err) {
    await readNotification(notificationId, false)
    throw Boom.internal(err);
  }
  res.sendStatus(204)
}

exports.getMessages = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
  } = req.query;

  const [user, client] = await getClient(username);
  const request = await findRequestById(requestId)
  if (request.author !== client._id.toString()) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const messages = await prepareRequestsMessages([ request ]);

  res.send(_.first(messages));
}
