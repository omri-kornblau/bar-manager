const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const ClientModel = Mongoose.model("Client");

exports.findClientById = async (_id, projection) => {
  const client = await ClientModel.findById(_id, projection);

  if (_.isNil(client)) {
    throw Boom.internal("Client not found");
  }
  return client;
}

exports.updateClientById = async (_id, action, returnNew=false) => {
  const updatedClient =
    await ClientModel.findByIdAndUpdate(_id, action, { new: returnNew });

  if (_.isNil(updatedClient)) {
    throw Boom.internal("Failed updating client");
  }
}

exports.addRequestToClientById = async (_id, requestId) => {
  return exports.updateClientById(
    _id,
    { $push: { requests: requestId } },
    true
  );
}

exports.removeRequestFromClientById = async (_id, requestId) => {
  return exports.updateClientById(
    _id,
    { $pull: { requests: Mongoose.mongo.ObjectId(requestId) } },
    true
  );
}

exports.addNotificationToClientById = async (_id, notificationId) => {
  return exports.updateClientById(
    _id,
    { $push: { unreadNotifications: notificationId } },
    true
  );
}

exports.readNotificationInClientById = async (_id, notificationId) => {
  return exports.updateClientById(
    _id,
    {
      $pull: { unreadNotifications: Mongoose.mongo.ObjectId(notificationId) },
      $push: { readNotifications: notificationId }
    },
    true
  );
}

exports.deleteNotificationByIds = async (_id, notificationId) => {
  return exports.updateClientById(
    _id,
    {
      $pull: {
        unreadNotifications: Mongoose.mongo.ObjectId(notificationId),
        readNotifications: Mongoose.mongo.ObjectId(notificationId),
      },
    },
    true
  );
}
