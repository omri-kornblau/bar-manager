const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_REGEX,
} = require("../config/consts");

const yupProviderSchema = Yup.object().shape({
  name: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  unreadNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  readNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  requests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  oldRequests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
  contactName: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  contactPhone: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid').required(),
  contactEmail: Yup.string().email().required(),
});

const mongoFormat = {
  name: {
    type: String
  },
  unreadNotifications: {
    type: Array
  },
  readNotifications: {
    type: Array
  },
  requests: {
    type: Array
  },
  oldRequests: {
    type: Array
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  contactName: {
    type: String
  },
  contactPhone: {
    type: String
  },
  contactEmail: {
    type: String
  },
};

const mongoOptions = {
  timestamps: true,
};

const providerSchema = new Mongoose.Schema(mongoFormat, mongoOptions);

providerSchema.pre("save", async function () {
  await yupProviderSchema.validate(this);
});

const Provider = Mongoose.model("Provider", providerSchema)
Provider.yupProviderSchema = yupProviderSchema;

module.exports = Provider;
