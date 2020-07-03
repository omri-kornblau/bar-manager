const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const NotificationModel = Mongoose.model("Notification");

exports.createNotification = async (message, requestId) => {
  const createdNotification = await NotificationModel.create({
    time: new Date().toISOString(),
    read: false,
    message,
    requestId
  })

  if (_.isNil(createdNotification)) {
    console.error(`Failed creating notification for request [${requestId}]`)
    throw Boom.internal(`Failed creating request`);
  }

  return createdNotification;
}

exports.deleteNotificationById = _id => {
  return NotificationModel.findByIdAndDelete(_id);
}

exports.findNotificationById = async _id => {
  const notification = await NotificationModel.findById(_id);

  if (_.isNil(notification)) {
    throw Boom.internal("Request not found");
  }
  return notification;
}
