const Mongoose = require("mongoose");
const Yup = require("yup");

const { OBJECT_ID_LENGTH } = require("../config/consts");

const yupNotificationSchema = Yup.object().shape({
  message: Yup.object(),
  time: Yup.date(),
  read: Yup.bool(),
  requestId: Yup.string().length(OBJECT_ID_LENGTH)
});

const mongoFormat = {
  message: {
    type: Object
  },
  time: {
    type: Date
  },
  read: {
    type: Boolean
  },
  requestId: {
    type: String
  }
};

const notificationScheme = new Mongoose.Schema(mongoFormat);

notificationScheme.pre("save", async function () {
  await yupNotificationSchema.validate(this);
});

const Notification = Mongoose.model("Notification", notificationScheme);

module.exports = Notification;
