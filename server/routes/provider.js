const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const RequestModel = Mongoose.model("Request");
const OfferModel = Mongoose.model("Offer");

const { REQUESTS_POOL_STATUSES } = require("../config/consts");
const {
  getProvider,
  fetchRequestById,
} = require("./utils");

const {
  setOffer,
  deleteOffer,
  findOfferByProviderId,
} = require("../db/offer");

const {
  addOffer: addOfferToRequest,
  removeOffer: removeOfferFromRequest,
  addMessage: addMessageToRequest,
  removeMessage: removeMessageFromRequest,
  getProviderRequests,
} = require("../db/request");

const {
  addOffer: addOfferToProvider,
  removeOffer: removeOfferFromProvider,
} = require("../db/provider");

const {
  addMessage,
  deleteMessage,
} = require("../db/message");

exports.getRequests = async (req, res) => {
  const {
    username,
  } = req;

  const {
    filters,
    type,
    skip,
    limit,
  } = req.body;

  const types = _.flattenDeep([type]);
  const provider = getProvider(username);

  const requests = await getProviderRequests(types, provider.requests, skip, limit);
  res.send(requests);
}

exports.setOffer = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    price,
  } = req.body;

  if (price <= 0) {
    throw Boom.badRequest("Price should be bigger then 0");
  }

  const [user, provider] = await getProvider(username)
  const originalOffer = await findOfferByProviderId(provider._id, false);
  if (!_.isNil(originalOffer) && price >= originalOffer.price) {
    throw Boom.badRequest("Price should be lower then last price")
  }

  const offer = await setOffer(provider._id, requestId, price);
  let request;
  let updatedProvider;
  try {
    request = await addOfferToRequest(requestId, offer._id);
    updatedProvider = await addOfferToProvider(provider._id, offer._id)
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeOfferFromRequest(requestId, offer._id);
      }
      if (!_.isNil(updatedProvider)) {
        await removeOfferFromProvider(requestId, offer._id);
      }
      await deleteOffer(offer._id);
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send(offer)
}

exports.sendMessage = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    body,
  } = req.body;

  const [user, provider] = await getProvider(username)
  const message = await addMessage(body, provider._id);
  let request;
  try {
    request = await addMessageToRequest(requestId, message._id);
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeMessageFromRequest(requestId, message._id);
      }
      await deleteMessage(message._id);
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send(message);
}

exports.fetchRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
  } = req.query;

  const [user, provider] = await getProvider(username);
  const request = await fetchRequestById(requestId);
  const myOffer = _.find(request.offers, {provider: provider._id.toString()});
  res.send({...request, myOffer: myOffer ? myOffer : {price: undefined}})
}
