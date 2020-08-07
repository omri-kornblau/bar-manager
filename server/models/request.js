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
  insuranceDuration: Yup.number().positive().integer().required(),
  isCurrentlyInsured: Yup.boolean(),
  maxPrice: Yup.number().positive().required(),
  comments: Yup.string(),
  startDate: Yup.date(),
  activeTime: Yup.date(),
  endTime: Yup.date(),
  policy: Yup.string().length(OBJECT_ID_LENGTH),
  extraFiles: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  messages: Yup.object(),
  offers: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
});

const yupUpdateRequestSchema = Yup.object().shape({
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
  startDate: {
    type: Date,
  },
  activeTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  policy: {
    type: String,
  },
  extraFiles: {
    type: Array,
  },
  messages: {
    type: Object,
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
};

const mongoOptions = {
  timestamps: true,
  minimize: false,
};

// Set 'minimize: false' to allow empty objects in
const requestScheme = new Mongoose.Schema(mongoFormat, mongoOptions);

requestScheme.pre("save", async function () {
  await yupCreateRequestSchema.validate(this);
});

const Request = Mongoose.model("Request", requestScheme);

Request.yupCreateRequestSchema = yupCreateRequestSchema;
Request.yupUpdateRequestSchema= yupUpdateRequestSchema;

module.exports = Request;
