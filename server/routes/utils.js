const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");
const { Readable } = require("stream");
const { createNotification } = require("../db/notification");
const {
  addNotificationToClientById,
  findClientById,
} = require("../db/client");

const {
  findProviderById,
} = require("../db/provider");

const {
  findMessageById,
} = require("../db/message");

const {
  findOfferById,
} = require("../db/offer");

const {
  findRequestById,
} = require("../db/request");
const { censorOffersForProvider, censorMessagesForProvider } = require("../censors");

const UserModel = Mongoose.model("User");
const ProviderModel = Mongoose.model("Provider");
const RequestModal = Mongoose.model("Request");

exports.findByIds = async (Model, ids, error) => {
  const promises = ids.map(_id => (
    Model.findById(_id)
  ));

  const res = await Promise.all(promises);
  if (res.some(_.isEmpty)) {
    throw Boom.internal(error);
  }
  return res;
}

exports.prepareRequests = async requests => {
  const promise = requests.map(request => (
    UserModel.findById(request.author)
  ))

  const authors = await Promise.all(promise);
  return requests.map((request, index) => {
    return {...request._doc, author: authors[index].username};
  });
}

exports.prepareNotifications = async notifications => {
  const promise = notifications.map(notification => (
    RequestModal.findById(notification.requestId)
  ))

  const requests = await Promise.all(promise);
  return notifications.map((notification, index) => {
    return {...notification._doc, request: requests[index]._doc};
  });
}

exports.getClient = async username => {
  const user = await UserModel.findOne({username});
  if (!user) {
    throw Boom.internal("User not found");
  }

  const client = await findClientById(user.clientId);

  return [user, client];
}

exports.getProvider = async username => {
  const user = await UserModel.findOne({username});
  if (!user) {
    throw Boom.internal("User not found");
  }

  const provider = await findProviderById(user.clientId);

  return [user, provider];
}

exports.writerFile = (attachment, file) => {
  return new Promise((resolve, reject) => {
    const readable = Readable.from(Buffer.from(file.content, 'base64'));
    attachment.write({filename: file.name}, readable, (error, file) => {
      if (error !== null) {
        return reject();
      }
      return resolve(file._id);
    });
  });
}

exports.readFile = (attachment, _id) => {
  return new Promise((resolve, reject) => {
    attachment.read({_id}, (error, buffer) => {
      if (error != null) {
        return reject();
      }
      return resolve(buffer);
    })
  })
}

exports.createNotification = async (message, requestId, clientId) => {
  const createdNotification = await createNotification(message, requestId);
  return await addNotificationToClientById(clientId, createdNotification._id);
}

exports.fetchRequestById = async (requestId, provider={}) => {
  const request = await findRequestById(requestId);

  const author = findClientById(request.author, { fullName: 1 });
  const messagesPromises = request.messages.map(findMessageById);
  const offersPromises = request.offers.map(findOfferById);

  const result = await Promise.all([author, ...messagesPromises, ...offersPromises]);

  const finalRequest = request._doc;

  let index = 0
  finalRequest.author = result[index];

  index += 1;
  finalRequest.messages = result.slice(index, index + messagesPromises.length);

  index += messagesPromises.length
  finalRequest.offers = result.slice(index);

  return finalRequest;
}
