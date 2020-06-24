const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const {
  REQUEST_STATUSES,
} = require("../types")

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
    return {...request._doc, author: authors[index].username, index: index+1};
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

exports.newRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    type,
    assetDescription,
    companyDescription,
    insurenceDuration,
    maxPrice,
    comments,
    isCurrentlyInsured,
  } = req.body;

  const user = await UserModel.findOne({username});
  if (user === null) {
    throw Boom.internal("User not found");
  }

  const createdRequest = await RequestModel.create({
    type,
    author: user._id,
    status: REQUEST_STATUSES[0],
    assetDescription,
    companyDescription,
    insurenceDuration,
    maxPrice,
    comments,
    isCurrentlyInsured: !!isCurrentlyInsured,
    createdTime: undefined,
    startDate: undefined,
    recivedTime: undefined,
    messages: [],
    offers: [],
  });

  if (createdRequest === null) {
    throw Boom.internal("Failed creating request");
  }

  const updatedClient = await ClientModel.updateOne({_id: user.clientId}, {$push: {requests: createdRequest._id}});
  if (updatedClient.n === 0) {
    await RequestModel.deleteOne({_id: createdRequest._id});
    throw Boom.internal("Failed updating client");
  }

  res.sendStatus(200);
}
