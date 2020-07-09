const _ = require("lodash");

const {
  USER_FOR_USER, OFFER_FOR_PROVIDER
} = require("./config/projections");

const applyProjection = (obj, projection) => {
  const pickedFields = _.map(projection, (val, key) => val === 1 ? key : "" );
  return _.pick(obj, pickedFields);
}

exports.censorUserForUser = userDoc => {
  return applyProjection(userDoc, USER_FOR_USER);
}

exports.censorOffersForProvider = (offers, provider) => {
  return offers.map((offer, key) => {
    const censoredProviderName = provider._id.toString() === offer.provider
      ? provider._id.toString()
      : `Company ${key}`;
    const pickedFieldsOffer = applyProjection(offer, OFFER_FOR_PROVIDER);
    pickedFieldsOffer.provider = censoredProviderName;

    return pickedFieldsOffer;
  });
}

exports.censorMessagesForProvider = (messages, provider) => {
  return messages.filter(message => message.from === provider._id.toString())
}
