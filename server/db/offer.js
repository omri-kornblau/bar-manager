const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const OfferModel = Mongoose.model("Offer");

exports.setOffer = async (providerId, requestId, price) => {
  const newOffer = await OfferModel.findOneAndUpdate({
      provider: providerId,
      request: requestId,
    },{
      $set: {
        provider: providerId,
        request: requestId,
        timestamp: new Date(),
        price,
      }
    },{
    new: true,
    upsert: true,
  })

  if (_.isNil(newOffer)) {
    throw Boom.internal("Failed setting offer");
  }

  return newOffer;
}

exports.deleteOffer = async offerId => {
  return OfferModel.findByIdAndDelete(offerId)
}

exports.findOfferById = async _id => {
  const offer = await OfferModel.findById(_id);

  if (_.isNil(offer)) {
    throw Boom.internal("Offer not found");
  }
  return offer;
}

exports.findOfferByProviderId = async (providerId, checkNil=true) => {
  const offer = await OfferModel.findOne({provider: Mongoose.mongo.ObjectID(providerId)});

  if (checkNil && _.isNil(offer)) {
    throw Boom.internal("Offer not found");
  }
  return offer;
}
