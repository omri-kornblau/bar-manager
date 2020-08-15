const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  PHONE_REGEX,
} = require("../config/consts");

const {
  NOTIFICATIONS_TYPES,
  PROVIDER_NOTIFICATIONS_TYPES,
} = require("../config/types");

const yupProviderSchema = Yup.object().shape({
  name: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  unreadNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  readNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  requests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
  contactName: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  contactPhone: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid').required(),
  contactEmail: Yup.string().email().required(),
  settings: Yup.object().shape({
    emailNotifications: Yup.object().shape(PROVIDER_NOTIFICATIONS_TYPES.reduce(
      (prev, cur) => {
        return {...prev, [NOTIFICATIONS_TYPES[cur]]: Yup.bool().required()}
      }, {})
    ).required(),
  }).required(),
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
