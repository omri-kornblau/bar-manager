const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const RequestModel = Mongoose.model("Request");

const { REQUESTS_POOL_STATUSES } = require("../config/consts");

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

