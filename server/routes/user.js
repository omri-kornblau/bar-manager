const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");
const ProviderModel = Mongoose.model("Provider");

const {
  USER_TYPES,
  NOTIFICATIONS_TYPES,
  CLIENT_NOTIFICATIONS_TYPES,
  PROVIDER_NOTIFICATIONS_TYPES,
} = require("../config/types");

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
    companyType,
    companySize,
  } = req.body;

  let createdClient;
  let createdUser;

  try {
    const emptyClient = {
      name,
      email,
      unreadNotifications: [],
      readNotifications: [],
      requests: [],
      settings: {
        emailNotifications: CLIENT_NOTIFICATIONS_TYPES.reduce(
          (prev, cur) => {
            return {...prev, [NOTIFICATIONS_TYPES[cur]]: true}
          }, {})
      },
      companyId,
      address,
      phoneNumber,
      owner,
      fieldOfActivity,
      companyType,
      companySize,
    }
    
    createdClient = await ClientModel.create(emptyClient);

    const user = {
      _id: createdClient._id,
      email,
      username,
      password,
      clientId: createdClient._id,
      type: USER_TYPES.client,
      lastLogin: new Date(),
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
      email,
      unreadNotifications: [],
      readNotifications: [],
      requests: [],
      settings: {
        emailNotifications: PROVIDER_NOTIFICATIONS_TYPES.reduce(
          (prev, cur) => {
            return {...prev, [NOTIFICATIONS_TYPES[cur]]: true}
          }, {})
      },
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
      lastLogin: new Date(),
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
