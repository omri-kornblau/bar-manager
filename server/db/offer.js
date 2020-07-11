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

exports.findOffer = async (requestId, providerId) => {
  const offer = await OfferModel.findOne({request: requestId, provider: providerId});

  if (_.isNil(offer)) {
    throw Boom.internal("Offer not found");
  }
  return offer;
}

exports.unsafeFindOffer = async (requestId, providerId) => {
  return await OfferModel.findOne({request: requestId, provider: providerId});
}
