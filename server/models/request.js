const Mongoose = require("mongoose");
const Yup = require("yup");
const Moment = require("moment");

const {
  OBJECT_ID_LENGTH,
  MIN_DURATION_LENGTH,
  MAX_DURATION_LENGTH,
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
  insuranceDuration: Yup.number().positive().integer().required(),
  isCurrentlyInsured: Yup.boolean(),
  maxPrice: Yup.number().positive().required(),
  tenderFinalDate: Yup.date()
    .transform((value, originalValue) => {
      return new Date(originalValue)
    })
    // startOf/endOf("day") use because the client side pick the time based on
    // the form start fill time and not submit time
    .min(Moment().add(MIN_DURATION_LENGTH, "days").startOf("day"))
    .max(Moment().add(MAX_DURATION_LENGTH, "days").endOf("day")),
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
  insuranceDuration: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
  tenderFinalDate: {
    type: Date,
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
