const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

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
  STATUS_UPDATE_ALLOWED_FIELDS
} = require("../config/consts");

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const client = await getClient(username);

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

  const user = await UserModel.findOne({ username });
  if (_.isNil(user)) {
    throw Boom.internal("User not found");
  }

  const client = await ClientModel.findOne({ _id: user.clientId });
  if (_.isNil(client)) {
    throw Boom.internal("Client not found");
  }

  if (!_.isArray(policy) || policy.length != 1) {
    throw Boom.badRequest("Policy file must be provided");
  }

  if (!_.isArray(extraFiles)) {
    throw Boom.badRequest("Extra files must be provided");
  }

  req.body.policy = await writerFile(Attachment, policy[0]);
  req.body.extraFiles = await Promise.all(extraFiles.map(file =>
    writerFile(Attachment, file)
  ));

  const createdRequest = await RequestModel.create({
    author: user._id,
    status: REQUEST_STATUSES[0],
    createdTime: new Date(),
    startDate: undefined,
    recivedTime: undefined,
    messages: [],
    offers: [],
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
    throw Boom.internal("Failed updating client");
  }

  res.status(200).send(createdRequest);
}

exports.updateRequest = async (req, res) => {
  const data = req.body;
  const {
    _id
  } = data;

  const currentRequest = await RequestModel.findById(_id);

  if (!_.includes(ALLOW_UPDATE_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status");
  }

  const cleanData = _.pick(data, STATUS_UPDATE_ALLOWED_FIELDS[data.status]);

  await yupUpdateRequestSchema.validate(cleanData);

  const updateRes = await RequestModel.findByIdAndUpdate(
    _id, { $set: { ...cleanData } }
  );

  if (updateRes.n === 0) {
    throw Boom.internal("Failed updating request");
  }

  res.sendStatus(204);
}

exports.downloadFiles = async (req, res) => {
  const {
    username
  } =  req;

  const {
    _id,
  } = req.body;
  const { Attachment } = internals;

  const client = await getClient(username);

  if (!client.requests.includes(_id) && !client.oldRequests.includes(_id)) {
    throw Boom.badRequest("_id not belong to client");
  }

  const request = await RequestModel.findById(_id);
  if (request === null) {
    throw Boom.internal("Request not found")
  }

  const files = Promise.all(request.extraFiles.map(fileId =>
    Attachment.read({_id: fileId})
  ));
  console.log(files);
  res.sendStatus(200);
}
