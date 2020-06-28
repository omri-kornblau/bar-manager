const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");
const Moment = require("moment");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const { yupUpdateRequestSchema } = require("../models/request");
const { internals } = require("../models/attachment");

const {
  writerFile,
  findByIds,
  prepareRequests,
  getClient,
} = require("./utils");

const {
  REQUEST_STATUSES,
} = require("../config/types")
const {
  ALLOW_UPDATE_STATUSES,
  STATUS_UPDATE_ALLOWED_FIELDS,
  ALLOW_ACCEPT_CANCEL_STATUSES,
  IN_TENDER_PROCEDURE_DURATION,
  WAITING_FOR_SIGN_DURATION,
} = require("../config/consts");

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  const requests = await prepareRequests(await findByIds(RequestModel, client.requests, "Request not found"));
  const oldRequests = await prepareRequests(await findByIds(OldRequestModel, client.oldRequests, "Old request not found"));
  const notifications = await findByIds(NotificationModel, client.unreadNotifictions, "Unread notification not found");

  res.send({requests, oldRequests, notifications});
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

  const createdRequest = await RequestModel.create({
    author: user._id,
    status: REQUEST_STATUSES[0],
    createdTime: new Date(),
    startDate: undefined,
    activeTime: undefined,
    messages: [],
    offers: [],
    firstAccept: "",
    secondAccept: "",
    index: client.requests.length + client.oldRequests.length,
    ...req.body
  });

  if (_.isNil(createdRequest)) {
    throw Boom.internal("Failed creating request");
  }

  const updateRes = await ClientModel.updateOne(
    { _id: user.clientId }, { $push: { requests: createdRequest._id } }
  );

  if (updateRes.n === 0) {
    await RequestModel.deleteOne({_id: createdRequest._id});
    filesIds.forEach(fileId => Attachment.unlink({_id: fileId}, err => {
      if (!isNil(err)) {
        console.error("Failed deleting file", fileId, err);
      }
    })
    )
    throw Boom.internal("Failed updating client");
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
    throw Boom.badRequest("_id not belong to client");
  }
  
  const currentRequest = await RequestModel.findById(_id);
  if (_.isNil(currentRequest)) {
    throw Boom.internal("Request not found");
  }

  if (!_.includes(ALLOW_UPDATE_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  const cleanData = _.pick(data, STATUS_UPDATE_ALLOWED_FIELDS[data.status]);

  await yupUpdateRequestSchema.validate(cleanData);

  const updateRes = await RequestModel.findByIdAndUpdate(
    _id, { $set: { ...cleanData } }
  );

  if (_.isNil(updateRes)) {
    throw Boom.internal("Failed updating request");
  }

  const newRequest = await RequestModel.findById(_id);
  if (_.isNil(newRequest)) {
    throw Boom.internal("Failed finding request after accept");
  }

  res.send(newRequest);
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

  const currentRequest = await RequestModel.findById(_id);
  if (_.isNil(currentRequest)) {
    throw Boom.internal("Request not found");
  }

  if (!_.includes(ALLOW_ACCEPT_CANCEL_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  const action = currentRequest.firstAccept === ""
    ? {$set: {firstAccept: user._id}}
    // TODO: understand how 2 clients accept the same request
    :  (currentRequest.secondAccept === "" /*&& currentRequest.firstAccept === user._id*/) 
      ? {$set: {
          secondAccept: user._id, 
          status: "inTenderProcedure",
          activeTime: Moment().add(IN_TENDER_PROCEDURE_DURATION),
          startDate: Moment().add(IN_TENDER_PROCEDURE_DURATION).add(WAITING_FOR_SIGN_DURATION),
        }}
      : null

  if (_.isNil(action)) {
    throw Boom.badRequest("Cannot update request with curent accepts statuses");
  }
  const request = await RequestModel.findByIdAndUpdate(_id, action);
  if (_.isNil(request)) {
    throw Boom.internal("Failed updating request");
  }

  const newRequest = await RequestModel.findById(_id);
  if (_.isNil(newRequest)) {
    throw Boom.internal("Failed finding request after accept");
  }

  res.send(newRequest);
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
    throw Boom.badRequest("_id not belong to client");
  }

  const currentRequest = await RequestModel.findById(_id);
  if (_.isNil(currentRequest)) {
    throw Boom.internal("Request not found");
  }

  if (!_.includes(ALLOW_ACCEPT_CANCEL_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot cancel request with such status");
  }

  const updateRes = await ClientModel.findByIdAndUpdate(client._id, {$pull: {
    requests: Mongoose.mongo.ObjectID(_id)
  }});
  if (_.isNil(updateRes)) {
    throw Boom.internal("Failed deleting request from client");
  }

  const deleteRes = await RequestModel.findByIdAndDelete(_id);
  if (_.isNil(deleteRes)) {
    console.error("Failed deleting request", _id);
  }

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

  const request = await RequestModel.findById(requestId);
  if (_.isNil(request)) {
    throw Boom.internal("Request not found")
  }
  
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
