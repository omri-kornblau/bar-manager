const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  COMPANY_ID_LENGTH,
  ADDRESS_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
  OWNER_MIN_LENGTH,
  OWNER_MAX_LENGTH,
  FILED_OF_ACTIVITY_MIN_LENGTH,
  FILED_OF_ACTIVITY_MAX_LENGTH,
  PHONE_REGEX,
} = require("../config/consts");


const yupClientSchema = Yup.object().shape({
  name: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH).required(),
  unreadNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  readNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  requests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  oldRequests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
  companyId: Yup.string().length(COMPANY_ID_LENGTH).required(),
  address: Yup.string().min(ADDRESS_MIN_LENGTH).max(ADDRESS_MAX_LENGTH).required(),
  phoneNumber: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid').required(),
  owner: Yup.string().min(OWNER_MIN_LENGTH).max(OWNER_MAX_LENGTH).required(),
  fieldOfActivity: Yup.string().min(FILED_OF_ACTIVITY_MIN_LENGTH).max(FILED_OF_ACTIVITY_MAX_LENGTH).required(),
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
  companyId: {
    type: String
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  owner: {
    type: String
  },
  fieldOfActivity: {
    type: String
  },
};

const mongoOptions = {
  timestamps: true,
};

const clientSchema = new Mongoose.Schema(mongoFormat, mongoOptions);

clientSchema.pre("save", async function () {
  await yupClientSchema.validate(this);
});

const Client = Mongoose.model("Client", clientSchema)
Client.yupClientSchema = yupClientSchema;

module.exports = Client;
