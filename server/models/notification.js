const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  USER_TYPES_VALUES, 
} = require("../config/consts");

const yupNotificationSchema = Yup.object().shape({
  message: Yup.object(),
  time: Yup.date(),
  read: Yup.bool(),
  requestId: Yup.string().length(OBJECT_ID_LENGTH),
  ownerId: Yup.string().length(OBJECT_ID_LENGTH),
  ownerType: Yup.mixed().oneOf(USER_TYPES_VALUES).required(),
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
  },
  ownerId: {
    type: String
  },
  ownerType: {
    type: String
  },
};

const notificationScheme = new Mongoose.Schema(mongoFormat);

notificationScheme.pre("save", async function () {
  await yupNotificationSchema.validate(this);
});

const Notification = Mongoose.model("Notification", notificationScheme);

module.exports = Notification;
