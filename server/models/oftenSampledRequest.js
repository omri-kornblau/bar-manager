const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
} = require("../config/consts");

const {
  REQUEST_STATUSES
} = require("../config/types");

const yupOftenSampledRequestSchema = Yup.object().shape({
  requestId: Yup.string().length(OBJECT_ID_LENGTH),
  status: Yup.mixed().oneOf(REQUEST_STATUSES),
  startDate: Yup.date(),
  activeTime: Yup.date(),
});

const mongoFormat = {
  requestId: {
    type: String
  },
  status: {
    type: String
  },
  startDate: {
    type: String
  },
  activeTime: {
    type: String
  }
};

const oftenSampledRequestSchema = new Mongoose.Schema(mongoFormat);

oftenSampledRequestSchema.pre("save", async function () {
  await yupOftenSampledRequestSchema.validate(this);
});

const OftenSampledRequest = Mongoose.model("OftenSampledRequest", oftenSampledRequestSchema);

module.exports = OftenSampledRequest;
