const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const OftenSampledModel = Mongoose.model("OftenSampledRequest");

exports.deleteOftenSampledRequestById = _id => {
  return OftenSampledModel.findByIdAndDelete(_id);
}
