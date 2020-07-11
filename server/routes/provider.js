const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");
const ProviderModel = Mongoose.model("Provider");
const RequestModel = Mongoose.model("Request");
const OldRequestModel = Mongoose.model("OldRequest");
const NotificationModel = Mongoose.model("Notification");

const {
  getProvider,
  fetchRequestById,
  findByIds,
  prepareNotifications,
  createClientNotification,
  downloadFile,
} = require("./utils");

const {
  setOffer,
  deleteOffer,
  unsafeFindOffer,
} = require("../db/offer");

const {
  addOffer: addOfferToRequest,
  removeOffer: removeOfferFromRequest,
  addMessage: addMessageToRequest,
  removeMessage: removeMessageFromRequest,
  getProviderRequests,
  findRequestById,
} = require("../db/request");

const {
  addRequest: addRequestToProvider,
  removRequest: removeRequestFromProvider,
  readNotificationInProviderById,
  updateProviderById,
} = require("../db/provider");

const {
  addMessage,
  deleteMessage,
} = require("../db/message");

const {
  updateUserById
} = require("../db/user");

const {
  censorMessagesForProvider,
  censorOffersForProvider
} = require("../censors");

const {
  ALLOW_SET_OFFER_STATUSES,
} = require("../config/consts");

exports.getAll = async (req, res) => {
  const {
    username,
  } = req;

  const [user, provider] = await getProvider(username);

  const requests = await findByIds(RequestModel, provider.requests, "Request not found");
  const oldRequests = await findByIds(OldRequestModel, provider.oldRequests, "Old request not found");
  const notifications = await prepareNotifications(await findByIds(NotificationModel, provider.unreadNotifications, "Unread notification not found"));

  res.send({ requests, oldRequests, notifications });
}

exports.getRequests = async (req, res) => {
  const {
    username,
  } = req;

  const {
    filters,
    type,
    skip,
    limit,
  } = req.body;

  const types = _.flattenDeep([type]);
  const [user, provider] = await getProvider(username);

  const [requests, totalRequests] = await getProviderRequests(types, provider.requests, skip, limit);
  res.send({
    requests,
    totalRequests,
  });
}

exports.setOffer = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    price,
  } = req.body;

  if (price <= 0) {
    throw Boom.badRequest("Price should be bigger then 0");
  }
  const originalRequest = await findRequestById(requestId);
  // TODO: think if we need mutex here
  if (!_.includes(ALLOW_SET_OFFER_STATUSES, originalRequest.status)) {
    throw Boom.unauthorized("Unauthorized to change request in current status");
  }

  const [user, provider] = await getProvider(username)
  const originalOffer = await unsafeFindOffer(requestId, provider._id);
  if (!_.isNil(originalOffer) && price >= originalOffer.price) {
    throw Boom.badRequest("Price should be lower then last price")
  }
  const offer = await setOffer(provider._id, requestId, price);

  let request;
  let updatedProvider;
  try {
    if (!_.includes(originalRequest.offers, offer._id)) {
      request = await addOfferToRequest(requestId, offer._id);
    }
    if (!_.includes(provider.offers, offer._id)) {
      updatedProvider = await addRequestToProvider(provider._id, requestId);
    }
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeOfferFromRequest(requestId, offer._id);
      }
      if (!_.isNil(updatedProvider)) {
        await removeRequestFromProvider(requestId, offer._id);
      }

      if (!_.isNil(request) && !_.isNil(updatedProvider)) {
        await deleteOffer(offer._id);
      }
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send(offer)
}

exports.sendMessage = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    body,
  } = req.body;

  const [user, provider] = await getProvider(username)
  const message = await addMessage(body, provider._id);
  let request;
  try {
    request = await addMessageToRequest(requestId, message._id, provider._id);
    await createClientNotification({
      type: "New Message",
      from: provider.name
    }, requestId, request.author)
  } catch (err) {
    try {
      if (!_.isNil(request)) {
        await removeMessageFromRequest(requestId, message._id, provider._id);
      }
      await deleteMessage(message._id);
    } catch(err) {
      console.error(err);
    }

    throw Boom.internal(err);
  }

  res.send(message);
}

const getMessageFromName = (message, author, provider) => {
  if (message.from === author._id) {
    return author.name;
  } else if (message.from === provider._id) {
    return provider.name;
  } else {
    return "unknown"
  }
}

exports.fetchRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
  } = req.query;


  const [user, provider] = await getProvider(username);
  const providerId = provider._id.toString()
  const request = await fetchRequestById(requestId, providerId);
  const myOffer = _.find(request.offers, { provider: providerId });

  request.offers = censorOffersForProvider(request.offers, provider)

  // Now messages is an array (after censor)
  request.messages = request.messages.map(message => {
    message.fromName = getMessageFromName(message, request.author, provider);
    return message;
  })

  res.send({...request, myOffer: myOffer ? myOffer : {price: undefined}})
}

exports.downloadFile = async (req, res) => {
  const {
    username
  } =  req;

  const {
    requestId,
    fileId,
  } = req.query;

  const [user, provider] = await getProvider(username);
  await downloadFile(provider, requestId, fileId, res);
}

exports.readNotification = async (req, res) => {
  const {
    username
  } =  req;

  const {
    notificationId,
  } = req.body;

  const [user, provider] = await getProvider(username);

  await readNotification(provider, notificationId, readNotificationInProviderById);
  res.sendStatus(204)
}

exports.updatesDetailes = async (req, res) => {
  const {
    username
  } = req;

  const [user, provider] = await getProvider(username);

  const newProvider = _.pick(req.body, ["name"]);
  await ProviderModel.yupProviderSchema.validate(newProvider);
  const newUser = _.pick(req.body, ["email"]);
  await UserModel.yupUserSchema.validate(newUser);

  await updateProviderById(provider._id, {$set: newProvider});
  await updateUserById(user._id, {$set: newUser});
  res.sendStatus(204);
}
