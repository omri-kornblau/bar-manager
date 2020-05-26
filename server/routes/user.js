const Mongoose = require("mongoose");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const ProviderModel = Mongoose.model("Provider");

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
