const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
} = require("../config/consts");

const {
  REQUEST_STATUSES,
  INSURENSE_TYPES,
} = require("../config/types")

const yupRequestSchema = Yup.object().shape({
  type: Yup.mixed().oneOf(INSURENSE_TYPES),
  author: Yup.string().length(OBJECT_ID_LENGTH),
  status: Yup.mixed().oneOf(REQUEST_STATUSES),
  assetDescription: Yup.string(),
  companyDescription: Yup.string(),
  insuranceDuration: Yup.number().positive(),
  isCurrentlyInsured: Yup.boolean(),
  maxPrice: Yup.number().positive(),
  comments: Yup.string(),
  createdTime: Yup.date(),
  startDate: Yup.date(),
  recivedTime: Yup.date(),
  policy: Yup.string().length(OBJECT_ID_LENGTH),
  extraFiles: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  messages: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  offers: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
});

const mongoFormat = {
  type: {
    type: String
  },
  author: {
    type: String,
  },
  status: {
    type: String,
  },
  assetDescription: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
  insuranceDuration: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
  comments: {
    type: String,
  },
  createdTime: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  recivedTime: {
    type: Date,
  },
  policy: {
    type: String,
  },
  extraFiles: {
    type: Array
  },
  messages: {
    type: Array,
  },
  offers: {
    type: Array,
  },
  isCurrentlyInsured: {
    type: Boolean
  },
  index: {
    type: Number
  }
};

const requestScheme = new Mongoose.Schema(mongoFormat);

requestScheme.pre("save", async function () {
  await yupRequestSchema.validate(this);
});

const Request = Mongoose.model("Request", requestScheme);

Request.yupRequestSchema = yupRequestSchema;

module.exports = Request;
