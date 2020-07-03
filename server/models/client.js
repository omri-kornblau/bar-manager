const Mongoose = require("mongoose");
const Yup = require("yup");

const { OBJECT_ID_LENGTH } = require("../config/consts");

const yupNotifictionSchema = Yup.object().shape({
  message: Yup.string(),
  time: Yup.date(),
  url: Yup.string(),
});

const yupClientSchema = Yup.object().shape({
  unreadNotifications: Yup.array().of(yupNotifictionSchema),
  readNotifications: Yup.array().of(yupNotifictionSchema),
  requests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  oldRequests: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
});

const mongoFormat = {
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
  }
};

const clientSchema = new Mongoose.Schema(mongoFormat)

clientSchema.pre("save", async function () {
  await yupClientSchema.validate(this);
});

const Client = Mongoose.model("Client", clientSchema)

// exports.ClientSchema = clientSchema
module.exports = Client;
