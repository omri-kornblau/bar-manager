const Mongoose = require("mongoose");
const Yup = require("yup");

const yupNotificationSchema = Yup.object().shape({
  message: Yup.string(),
  date: Yup.date(),
  read: Yup.bool(),
});

const mongoFormat = {
  message: {
    type: String
  },
  date: {
    type: Date
  },
  read: {
    type: Boolean
  },
};

const notificationScheme = new Mongoose.Schema(mongoFormat);

notificationScheme.pre("save", async function () {
  await yupNotificationSchema.validate(this);
});

const Notification = Mongoose.model("Notification", notificationScheme);

module.exports = Notification;
