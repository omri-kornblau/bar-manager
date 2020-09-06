const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const logger = require("../log/logger").logger;

const NotificationModel = Mongoose.model("Notification");

exports.createNotification = async (message, requestId, ownerId, ownerType) => {
  const createdNotification = await NotificationModel.create({
    time: new Date().toISOString(),
    read: false,
    message,
    requestId,
    ownerId,
    ownerType,
  })

  if (_.isNil(createdNotification)) {
    logger.error(`Failed creating notification for request`, {
      requestId,
      ownerId,
      ownerType
    });

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

exports.readNotification = async (_id, isRead) => {
  const updatedNotification = await NotificationModel.findByIdAndUpdate(
    _id,
    { $set: {read: isRead} },
    { new: true}
  );

  if (_.isNil(updatedNotification)) {
    throw Boom.internal("Failed updating notification");
  }

  return updatedNotification;
}

exports.findNotification = async query => {
  const notification = await NotificationModel.findOne(query);

  if (_.isNil(request)) {
    throw Boom.internal("Notification not found");
  }
  return notification;
}

exports.findNotificationByRequestId = async requestId => {
  return await NotificationModel.find({ requestId });
}

exports.findNotificationByRequestId = async requestId => {
  return await NotificationModel.find({ requestId });
}

exports.deleteNotificationById = async id => {
  return await NotificationModel.findByIdAndDelete(id);
}
