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
} = require("../db/offer");

const {
  addOffer: addOfferToRequest,
  removeOffer: removeOfferFromRequest,
  addMessage: addMessageToRequest,
  removeMessage: removeMessageFromRequest,
  getProviderRequests,
  findRequestById,
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

  let provider = await getProvider(username)
  const offer = await setOffer(provider._id, requestId, price);
  let request;
  try {
    request = await addOfferToRequest(requestId, offer._id);
    provider = await addOfferToProvider(provider._id, offer._id)
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeOfferFromRequest(requestId, offer._id);
      }
      if (!_.isNil(provider)) {
        await removeOfferFromProvider(requestId, offer._id);
      }
      await deleteOffer(offer._id);
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send({
    offer,
    request,
    provider
  })
}

exports.sendMessage = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    body,
  } = req.body;

  const provider = await getProvider(username)
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

  res.send({
    request,
    message,
  })
}

exports.fetchRequest = async (req, res) => {
  const {
    requestId,
  } = req.query;

  const request = await fetchRequestById(requestId);
  res.send(request);
}
