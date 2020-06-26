const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const ProviderModel = Mongoose.model("Provider");

const { USER_TYPES } = require("../config/types");

exports.signupClient = async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  let createdClient = undefined;

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
      clientId: createdClient._id,
      type: USER_TYPES.client,
    }

    await UserModel.create(user);
  } catch (err) {
    if (createdClient != undefined) {
      await ClientModel.deleteOne(createdClient);
    }

    throw err;
  }

  res.sendStatus(200);
}

exports.signupProvider = async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  let createdProvider = undefined;
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
      clientId: createdProvider._id,
      type: USER_TYPES.provider,
    }

    await UserModel.create(user);
  } catch (err) {
    if (createdProvider != undefined) {
      await ProviderModel.deleteOne(createdProvider);
    }

    throw err;
  }

  res.sendStatus(200);
}
