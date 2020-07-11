const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const ProviderModel = Mongoose.model("Provider");

exports.findProviderById = async _id => {
  const provider = await ProviderModel.findById(_id);

  if (_.isNil(provider)) {
    throw Boom.internal("provider not found");
  }
  return provider;
}

exports.updateProviderById = async (_id, action, returnNew=false) => {
  const updatedProvider = await ProviderModel.findByIdAndUpdate(_id, action, { new: returnNew });

  if (_.isNil(updatedProvider)) {
    throw Boom.internal("Failed updating provider");
  }

  return updatedProvider;
}

exports.addRequest = async (providerId, requestId) => {
  return exports.updateProviderById(
    providerId,
    {
      $addToSet: {
        requests: requestId
      }
    },
    true
  )
}

exports.removRequest = async (providerId, requestId) => {
  return exports.updateProviderById(
    providerId,
    {
      $pull: {
        requests: requestId
      }
    },
    true
  )
}

exports.readNotificationInProviderById = async (_id, notificationId) => {
  return exports.updateProviderById(
    _id,
    {
      $pull: { unreadNotifications: Mongoose.mongo.ObjectId(notificationId) },
      $push: { readNotifications: notificationId }
    },
    true
  );
}
