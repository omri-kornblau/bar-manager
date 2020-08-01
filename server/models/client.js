const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} = require("../config/consts");

const yupClientSchema = Yup.object().shape({
  name: Yup.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  unreadNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  readNotifications: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  requests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  oldRequests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  name: Yup.string(),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
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
