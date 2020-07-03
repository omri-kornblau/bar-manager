const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const SampledModel = Mongoose.model("SampledRequest");

exports.createSampledFromRequest = async (request) => {
  const {
    _id,
    activeTime,
    startDate
  } = request;

  const createdSampled = await SampledModel.create({
    status: "inTenderProcedure",
    requestId: _id,
    startDate,
    activeTime,
  });

  if (_.isNil(createdSampled)) {
    throw Boom.internal("Creating sampled failed");
  }

  return createdSampled;
}
