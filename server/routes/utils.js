const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");
const { Readable } = require("stream");

const {
  createNotification,
  readNotification,
} = require("../db/notification");
const {
  addNotificationToClientById,
  findClientById,
} = require("../db/client");
const {
  addNotificationToProviderById,
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
const {
  findFileById,
} = require("../db/attachment");
const { censorMessagesForProvider } = require("../censors");
const { internals } = require("../models/attachment");
const {
  ALLOW_ALL_PROVIDERS_DOWNLOAD_FILE,
} = require("../config/consts");

const UserModel = Mongoose.model("User");
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

exports.prepareRequestsMessages = async requests => {
  const messagesFieldIds = requests.reduce((data, request) => {
    const { messages } = request;
    data.providerIds = data.providerIds.concat(_.keys(messages));
    data.messageIds = data.messageIds.concat(_.flatMap(messages));

    return data;
  }, {
    providerIds: [],
    messageIds: []
  });

  messagesFieldIds.providerIds = _.uniq(messagesFieldIds.providerIds);

  const {
    providerIds,
    messageIds
  } = messagesFieldIds;

  const providersPromise = providerIds.map(findProviderById);
  const messagesPromise = messageIds.map(findMessageById);

  const providersById =
    _.zipObject(providerIds, await Promise.all(providersPromise))
  const messagesById =
    _.zipObject(messageIds, await Promise.all(messagesPromise))

  return requests.map((request, index) => {
    const { messages } = request._doc;
    const messagesKeys = _.keys(messages);
    const finalMessages = _.zipObject(messagesKeys,
      _.toPairs(messages).map(pair => {
        const [providerId, providerMessages] = pair;
        const { name } = providersById[providerId];
        const providerMessagesWithData =
          providerMessages.map(messageId => messagesById[messageId]);
        return [name, providerMessagesWithData]
      })
    );
    return finalMessages;
  });

}

exports.prepareRequestFiles = async request => {
  const policy = findFileById(request.policy);
  const extraFiles = request.extraFiles.map(fileId =>
    findFileById(fileId)
  );
  const files = await Promise.all([policy, ...extraFiles]);

  return {
    policy: files[0],
    extraFiles: files.slice(1),
  };
}

exports.prepareRequestsFiles = async requests => {
  return await Promise.all(requests.map(request => (
    exports.prepareRequestFiles(request)
  )));
}

exports.prepareRequestsOffers = async requests => (
  await Promise.all(requests.map(async request => {
    const requestOffers = await Promise.all(request.offers.map(findOfferById));
    const offersProviders = await Promise.all(requestOffers.map(offer =>
      findProviderById(offer.provider)
    ));
    return requestOffers.map((offer, index) =>
      _.set(offer._doc, "provider", offersProviders[index].name)
    )
  }))
)

exports.prepareRequestsAuthors = async requests => {
  return await Promise.all(requests.map(request =>
    UserModel.findById(request.author)
  ));
}

exports.prepareRequests = async requests => {
  // TODO: run all the requests async
  const authors = await exports.prepareRequestsAuthors(requests);
  const messages = await exports.prepareRequestsMessages(requests);
  const files = await exports.prepareRequestsFiles(requests);
  const offers = await exports.prepareRequestsOffers(requests);

  return requests.map((request, index) => {
    return {
      ...request._doc,
      author: authors[index].username,
      messages: messages[index],
      policy: files[index].policy,
      extraFiles: files[index].extraFiles,
      offers: offers[index]
    };
  });
}

exports.prepareNotifications = async notifications => {
  const promise = notifications.map(notification => (
    RequestModal.findById(notification.requestId)
  ))

  const requests = await Promise.all(promise);
  return notifications
    .map((notification, index) => {
      if (_.isNil(requests[index])) return null;
      return {...notification._doc, request: requests[index]._doc};
    })
    .filter(notification => !_.isNil(notification));
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

exports.createClientNotification = async (message, requestId, clientId) => {
  const createdNotification = await createNotification(message, requestId);
  return await addNotificationToClientById(clientId, createdNotification._id);
}

exports.createProviderNotification = async (message, requestId, providerId) => {
  const createdNotification = await createNotification(message, requestId);
  return await addNotificationToProviderById(providerId, createdNotification._id);
}

exports.fetchRequestById = async (requestId, providerId) => {
  const request = await findRequestById(requestId);

  const author = findClientById(request.author, { fullName: 1 });
  const providerMessages = !_.isNil(providerId) ?
    censorMessagesForProvider(request.messages, providerId)
    : [];

  const messagesPromises = providerMessages.map(findMessageById);
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

exports.downloadFile = async (client, requestId, fileId, res) => {
  const { Attachment } = internals;

  if (!client.requests.includes(requestId)
  && !client.oldRequests.includes(requestId)) {
    throw Boom.badRequest("Request not belong to client or provider");
  }

  const request = await findRequestById(requestId)
  if (!request.extraFiles.includes(fileId) && fileId !== request.policy) {
    throw Boom.badRequest("File not belong to request")
  }

  const file = await findFileById(fileId);
  const readStream = Attachment.read({_id: Mongoose.mongo.ObjectID(fileId)});

  res.set("Content-Type", "application/octet-stream");
  res.set("Content-Disposition", `attachment; filename=\"${file.filename}\"`);
  readStream.pipe(res);
}

exports.providerDownloadFile = async (provider, requestId, fileId, res) => {
  const { Attachment } = internals;

  const request = await findRequestById(requestId)
  if (!ALLOW_ALL_PROVIDERS_DOWNLOAD_FILE.includes(request.status)
  && !provider.requests.includes(requestId)
  && !provider.oldRequests.includes(requestId)) {
    throw Boom.badRequest("Request not belong to provider");
  }

  if (!request.extraFiles.includes(fileId) && fileId !== request.policy) {
    throw Boom.badRequest("File not belong to request")
  }

  const file = await findFileById(fileId);
  const readStream = Attachment.read({_id: Mongoose.mongo.ObjectID(fileId)});

  res.set("Content-Type", "application/octet-stream");
  res.set("Content-Disposition", `attachment; filename=\"${file.filename}\"`);
  readStream.pipe(res);
}

exports.readNotification = async (client, notificationId, readNotifcationFunc) => {
  if (!client.unreadNotifications.includes(notificationId)) {
    throw Boom.badRequest("Notification not belong to client");
  }

  await readNotification(notificationId, true)
  try {
    await readNotifcationFunc(client._id, notificationId);
  } catch (err) {
    await readNotification(notificationId, false)
    throw Boom.internal(err);
  }
}
