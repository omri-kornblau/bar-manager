const Mongoose = require("mongoose");
const Yup = require("yup");

const { OBJECT_ID_LENGTH } = require("../config/consts");

const yupOftenSampledRequestSchema = Yup.object().shape({
  requestId: Yup.string().length(OBJECT_ID_LENGTH),
});

const mongoFormat = {
  requestId: {
    type: String
  },
};

const oftenSampledRequestSchema = new Mongoose.Schema(mongoFormat);

oftenSampledRequestSchema.pre("save", async function () {
  await yupOftenSampledRequestSchema.validate(this);
});

const OftenSampledRequest = Mongoose.model("OftenSampledRequest", oftenSampledRequestSchema);

module.exports = OftenSampledRequest;
