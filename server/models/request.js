const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
} = require("../config/consts");

const {
  REQUEST_STATUSES,
  INSURENSE_TYPES,
} = require("../config/types")

const yupCreateRequestSchema = Yup.object().shape({
  type: Yup.mixed().oneOf(INSURENSE_TYPES).required(),
  author: Yup.string().length(OBJECT_ID_LENGTH),
  status: Yup.mixed().oneOf(REQUEST_STATUSES),
  assetDescription: Yup.string().required(),
  companyDescription: Yup.string().required(),
  insuranceDuration: Yup.number().positive().required(),
  isCurrentlyInsured: Yup.boolean(),
  maxPrice: Yup.number().positive().required(),
  comments: Yup.string(),
  createdTime: Yup.date(),
  startDate: Yup.date(),
  activeTime: Yup.date(),
  policy: Yup.string().length(OBJECT_ID_LENGTH),
  extraFiles: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  messages: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  offers: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  firstAccept: Yup.string().test('len', 'Must be "" or object id length', val => val.length === OBJECT_ID_LENGTH || val.length === 0),
  secondAccept: Yup.string().test('len', 'Must be "" or object id length', val => val.length === OBJECT_ID_LENGTH || val.length === 0),
});

const yupUpdateRequestSchema = Yup.object().shape({
  assetDescription: Yup.string().required(),
  companyDescription: Yup.string().required(),
  insuranceDuration: Yup.number().positive().required(),
  isCurrentlyInsured: Yup.boolean(),
  maxPrice: Yup.number().positive().required(),
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
  activeTime: {
    type: Date,
  },
  policy: {
    type: String,
  },
  extraFiles: {
    type: Array,
  },
  messages: {
    type: Array,
  },
  offers: {
    type: Array,
  },
  isCurrentlyInsured: {
    type: Boolean,
  },
  index: {
    type: Number,
  },
  firstAccept: {
    type: String,
  },
  secondAccept: {
    type: String,
  },
};

const requestScheme = new Mongoose.Schema(mongoFormat);

requestScheme.pre("save", async function () {
  await yupCreateRequestSchema.validate(this);
});

const Request = Mongoose.model("Request", requestScheme);

Request.yupCreateRequestSchema = yupCreateRequestSchema;
Request.yupUpdateRequestSchema= yupUpdateRequestSchema;

module.exports = Request;
