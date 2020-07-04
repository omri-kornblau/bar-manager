const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const OfferModel = Mongoose.model("Offer");

exports.setOffer = async (providerId, requestId, price) => {
  const newOffer = await OfferModel.findOneAndUpdate({
      provider: provider._id,
      requests: requestId,
    },{
      $set: {
        provider: providerId,
        requests: requestId,
        timestamp: new Date(),
        price,
      }
    },{
    returnNewDocument: true,
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
