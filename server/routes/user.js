const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const ProviderModel = Mongoose.model("Provider");
const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const { USER_TYPES } = require("../types");

exports.signupClient = async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  let createdClient = undefined;
  let status = 200;
  try {
    const emptyClient = {
      unreadNotifictions: [],
      readNotifications: [],
      requests: [],
      oldRequests: [],
    }

    createdClient = await ClientModel.create(emptyClient);

    const user = {
      email,
      username,
      password,
      data: createdClient._id,
      type: USER_TYPES.client,
    }

    await UserModel.create(user);
  } catch (err) {
    console.error(err);

    if (createdClient != undefined) {
      await ClientModel.deleteOne(createdClient);
    }

    status = 400;
  }

  res.send(status);
}

const findByIds = async (Model, ids, error) => {
  console.log(ids)
  const promises =  ids.map(async _id => (
    await Model.findById(_id)
  ));

  const res = await Promise.all(promises);
  if (!res.every(item => item !== null)) {
    throw Boom.internal(error);
  }
  return res;
}

exports.getAll = async (req, res) => {
  // TODO: achive the username param from the authentication insted of from the url
  const {
    username
  } = req.query;

  const user = await UserModel.findOne({username});
  if (user === undefined) {
    throw Boom.badRequest("User not found");
  }

  const client = await ClientModel.findOne({_id: user.clientId});
  if (client === undefined) {
    throw Boom.internal("Client not found");
  }

  const requests = await findByIds(RequestModel, client.requests, "Request not found");
  const oldRequests = await findByIds(OldRequestModel, client.oldRequests, "Old request not found");
  const notifications = await findByIds(NotificationModel, client.unreadNotifictions, "Unread notification not found");

  res.send({requests, oldRequests, notifications});
}

exports.signupProvider = async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  let createdProvider = undefined;
  let status = 200;
  try {
    const emptyProvider = {
      unreadNotifictions: [],
      readNotifications: [],
      requests: [],
      oldRequests: [],
    }

    createdProvider = await ProviderModel.create(emptyProvider);

    const user = {
      email,
      username,
      password,
      data: createdProvider._id,
      type: USER_TYPES.provider,
    }

    await UserModel.create(user);
  } catch (err) {
    console.error(err);

    if (createdProvider != undefined) {
      await ProviderModel.deleteOne(createdProvider);
    }

    status = 500;
  }

  res.send(status);
}
