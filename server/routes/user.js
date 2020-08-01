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
    name,
    companyId,
    address,
    phoneNumber,
    owner,
    fieldOfActivity,
  } = req.body;

  let createdClient;
  let createdUser;

  try {
    const emptyClient = {
      name,
      unreadNotifications: [],
      readNotifications: [],
      requests: [],
      oldRequests: [],
      companyId,
      address,
      phoneNumber,
      owner,
      fieldOfActivity,
    }

    createdClient = await ClientModel.create(emptyClient);

    const user = {
      _id: createdClient._id,
      email,
      username,
      password,
      clientId: createdClient._id,
      type: USER_TYPES.client,
    }

    createdUser = await UserModel.create(user);
  } catch (err) {
    if (createdClient != undefined) {
      await ClientModel.deleteOne(createdClient);
    }

    throw err;
  }

  res.status(200).send(createdUser);
}

exports.signupProvider = async (req, res) => {
  const {
    email,
    username,
    password,
    name,
    contactName,
    contactPhone,
    contactEmail,
  } = req.body;

  let createdProvider = undefined;

  try {
    const emptyProvider = {
      name,
      unreadNotifications: [],
      readNotifications: [],
      requests: [],
      oldRequests: [],
      contactName,
      contactPhone,
      contactEmail
    }

    createdProvider = await ProviderModel.create(emptyProvider);

    const user = {
      _id: createdProvider._id,
      email,
      username,
      password,
      clientId: createdProvider._id,
      type: USER_TYPES.provider,
    }

    createdUser = await UserModel.create(user);
  } catch (err) {
    if (createdProvider != undefined) {
      await ProviderModel.deleteOne(createdProvider);
    }

    throw err;
  }

  res.status(200).send(createdUser);
}
