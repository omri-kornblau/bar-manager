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

exports.addOffer = async (providerId, offerId) => {
  return exports.updateProviderById(
    providerId,
    {
      $addToSet: {
        offers: offerId
      }
    },
    true
  )
}

exports.removeOffer = async (providerId, offerId) => {
  return exports.updateProviderById(
    providerId,
    {
      $pull: {
        offers: offerId
      }
    },
    true
  )
}
