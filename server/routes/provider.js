const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const RequestModel = Mongoose.model("Request");
const OfferModel = Mongoose.model("Offer");

const { REQUESTS_POOL_STATUSES } = require("../config/consts");
const {
  getProvider,
} = require("./utils");

const {
  setOffer,
  deleteOffer,
} = require("../db/offer");

const {
  addOffer: addOfferToRequest,
  removeOffer: removeOfferFromRequest,
} = require("../db/request");

const {
  addOffer: addOfferToProvider,
  removeOffer: removeOfferFromProvider,
} = require("../db/provider");

exports.getAllRequests = async (req, res) => {
  const {
    filters,
    type
  } = req.body;

  const types = _.flattenDeep([type]);

  const requests = await RequestModel.find({
    status: { $in: REQUESTS_POOL_STATUSES },
    type: { $in: types }
  });

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
