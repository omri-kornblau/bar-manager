const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const MessageModel = Mongoose.model("Message");

exports.addMessage = async (body, from) => {
  const newMessage = await MessageModel.create({
    body,
    from,
    timestamp: new Date(),
  })

  if (_.isNil(newMessage)) {
    throw Boom.internal("Failed adding message");
  }

  return newMessage;
}

exports.deleteMessage = async messageId => {
  return MessageModel.findByIdAndDelete(messageId)
}

