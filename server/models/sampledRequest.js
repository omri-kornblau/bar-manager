const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
} = require("../config/consts");

const {
  REQUEST_STATUSES
} = require("../config/types");

const yupSampledRequestSchema = Yup.object().shape({
  requestId: Yup.string().length(OBJECT_ID_LENGTH).required(),
  status: Yup.mixed().oneOf(REQUEST_STATUSES).required(),
  startDate: Yup.date().required(),
  activeTime: Yup.date().required(),
  endTime: Yup.date().required(),
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
  },
  endTime: {
    type: String
  }
};

const sampledRequestSchema = new Mongoose.Schema(mongoFormat);

sampledRequestSchema.pre("save", async function () {
  await yupSampledRequestSchema.validate(this);
});

const SampledRequest = Mongoose.model("SampledRequest", sampledRequestSchema);

module.exports = SampledRequest;
