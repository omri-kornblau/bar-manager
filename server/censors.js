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
      ? provider.name
      : `#${key}`;
    const pickedFieldsOffer = applyProjection(offer, OFFER_FOR_PROVIDER);
    pickedFieldsOffer.provider = censoredProviderName;

    return pickedFieldsOffer;
  });
}

exports.censorMessagesForProvider = (messages, providerId) => {
  if (_.isNil(providerId)) {
    console.error("Provider ID is undefined");
    return [];
  }
  const providerMessages = messages[providerId];
  if (_.isNil(providerMessages)) {
    console.error("No messages for this provider");
    return [];
  }
  return providerMessages;
}

exports.censorAccountSettings = account => {
  return _.omit(account, [
    "_id",
    "unreadNotifications",
    "readNotifications",
    "requests",
    "createdAt",
    "updatedAt",
  ]);
}
