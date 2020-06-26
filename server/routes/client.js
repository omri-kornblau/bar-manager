const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const yupRequestSchema = require("../models/request").yupRequestSchema;

const {
  REQUEST_STATUSES,
} = require("../config/types")
const {
  ALLOW_UPDATE_STATUSES,
  STATUS_UPDATE_ALLOWED_FIELDS
} = require("../config/consts");

const findByIds = async (Model, ids, error) => {
  const promises = ids.map(_id => (
    Model.findById(_id)
  ));

  const res = await Promise.all(promises);
  if (res.some(_.isEmpty)) {
    throw Boom.internal(error);
  }
  return res;
}

const prepareRequests = async requests => {
  const promise = requests.map(request => (
    UserModel.findById(request.author)
  ))

  const authors = await Promise.all(promise);

  return requests.map((request, index) => {
    return {...request._doc, author: authors[index].username};
  });
}

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const user = await UserModel.findOne({username});
  if (!user) {
    throw Boom.internal("User not found");
  }

  const client = await ClientModel.findById(user.clientId);
  if (!client) {
    throw Boom.internal("Client not found");
  }

  const requests = await prepareRequests(await findByIds(RequestModel, client.requests, "Request not found"));
  const oldRequests = await prepareRequests(await findByIds(OldRequestModel, client.oldRequests, "Old request not found"));
  const notifications = await findByIds(NotificationModel, client.unreadNotifictions, "Unread notification not found");

  res.send({requests, oldRequests, notifications});
}

exports.createRequest = async (req, res) => {
  const {
    username
  } = req;

  const user = await UserModel.findOne({ username });
  if (_.isNil(user)) {
    throw Boom.internal("User not found");
  }

  const client = await ClientModel.findOne({ _id: user.clientId });
  if (_.isNil(client)) {
    throw Boom.internal("Client not found");
  }

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

  await yupRequestSchema.validate(cleanData);

  const updateRes = await RequestModel.findByIdAndUpdate(
    _id, { $set: { ...cleanData } }
  );

  if (updateRes.n === 0) {
    throw Boom.internal("Failed updating request");
  }

  res.sendStatus(204);
}
