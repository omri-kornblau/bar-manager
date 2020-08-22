const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const logger = require("../log/logger").logger;

const RequestModel = Mongoose.model("Request");
const ClientModel = Mongoose.model("Client");
const UserModel = Mongoose.model("User");
const NotificationModel = Mongoose.model("Notification");

const { internals } = require("../models/attachment");
const {
  CLIENT_NOTIFICATIONS_TYPES,
  NOTIFICATIONS_TYPES,
} = require("../config/types");

const {
  writerFile,
  findByIds,
  prepareRequests,
  prepareNotifications,
  getClient,
  getProvider,
  prepareRequestsMessages,
  createProviderNotification,
  downloadFile,
  readNotification,
} = require("./utils");

const {
  createRequest,
  deleteRequestById,
  findRequestById,
  findRequestByExtraFileId,
  updateRequestFieldsById,
  removeFileFromExtraFiles,
  addMessage: addMessageToRequest
} = require("../db/request");
const {
  addRequestToClientById,
  removeRequestFromClientById,
  readNotificationInClientById,
  updateClientById,
  deleteNotificationByIds: deleteClientNotificationByIds,
} = require("../db/client");
const {
  createSampledFromRequest,
  deleteSampledRequestById
} = require("../db/sampledRequest");
const {
  deleteOftenSampledRequestById,
} = require("../db/oftenSampledRequests")
const {
  addMessage
} = require("../db/message");
const {
  findFileById,
} = require("../db/attachment");
const {
  updateUserById,
} = require("../db/user");
const {
  findNotificationByRequestId,
  deleteNotificationById,
} = require("../db/notification");

const {
  REQUEST_STATUSES,
} = require("../config/types")
const {
  ALLOW_UPDATE_STATUSES,
  STATUS_UPDATE_ALLOWED_FIELDS,
  ALLOW_ACCEPT_CANCEL_STATUSES,
} = require("../config/consts");
const {
  findProviderById,
  deleteNotificationByIds: deleteProviderNotificationByIds,
} = require("../db/provider");
const {
  censorAccountSettings,
} = require("../censors");

exports.getAll = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  // TODO: better logs here
  const requests = await prepareRequests(await findByIds(RequestModel, client.requests, "Request not found"));
  const notifications = await prepareNotifications(await findByIds(NotificationModel, client.unreadNotifications, "Unread notification not found"));
  
  res.send({ ...censorAccountSettings(client._doc), requests, notifications });
}

exports.createRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    policy,
    extraFiles,
  } = req.body;

  const { Attachment } = internals;

  const [user, client] = await getClient(username);

  if (!_.isArray(policy) || policy.length != 1) {
    throw Boom.badRequest("Policy file must be provided");
  }

  if (!_.isArray(extraFiles)) {
    throw Boom.badRequest("Extra files must be provided");
  }

  const filesIds = await Promise.all([policy[0], ...extraFiles].map(file =>
    writerFile(Attachment, file)
  ));

  req.body.policy = filesIds[0];
  req.body.extraFiles = filesIds.slice(1);

  const createdRequest = await createRequest({
    author: user._id,
    status: REQUEST_STATUSES[0],
    index: client.requests.length,
    ...req.body
  });

  try {
    await addRequestToClientById(user.clientId, createdRequest._id);
  } catch (err) {
    logger.error("Failed creating request", { username, err })
    await deleteRequestById(createdRequest._id);

    filesIds.forEach(fileId =>
      Attachment.unlink({ _id: fileId }, err => {
        if (!_.isNil(err)) {
          logger.error("Failed deleting file", { fileId, username, req })
        }
      })
    )

    logger.error("Failed updating client after creating request", { username });
    throw Boom.internal(err);
  }

  try {
    await createSampledFromRequest(createdRequest, user._id)
  } catch (err) {
    logger.error("Failed creating sampled request", { username, err });

    await deleteRequestById(createdRequest._id);
    await removeRequestFromClientById(client._id, createdRequest._id)

    filesIds.forEach(fileId =>
      Attachment.unlink({ _id: fileId }, err => {
        if (!_.isNil(err)) {
          logger.error("Failed deleting file", { fileId, err });
        }
      })
    )

    throw Boom.internal(err);
  }

  res.status(200).send(createdRequest);
}

exports.sendMessage = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
    providerId,
    body,
  } = req.body;

  const provider = await findProviderById(providerId);
  if (_.isNil(provider)) {
    logger.error("Provider not found", { username, requestId, providerId });
    throw Boom.badRequest("No such provider", { providerId });
  }

  const [user, client] = await getClient(username)
  const message = await addMessage(body, client._id);

  let request;
  try {
    request = await addMessageToRequest(requestId, message._id, providerId);
    await createProviderNotification({
      type: NOTIFICATIONS_TYPES.newMessage,
      from: client.name
    }, requestId, providerId)
  } catch (err) {
    logger.error("Failed creating message", { from: client.name, requestId })
    try {
      if (!_.isNil(request)) {
        await removeMessageFromRequest(requestId, message._id, providerId);
      }
      await deleteMessage(message._id);
    } catch(err) {
      logger.error("Failed deleting message", { messageId: message._id, requestId })
    }

    throw Boom.internal(err);
  }

  res.send(message);
}

exports.updateRequest = async (req, res) => {
  const {
    username
  } = req
  const data = req.body;

  const {
    _id,
    policy,
    extraFiles,
  } = data;

  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id)) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_UPDATE_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot update request with such status", { requestId: _id });
  }
  if (currentRequest.offers.length > 0) {
    throw Boom.badRequest("Cannot update request with offers", { requestId: _id });
  }

  if (_.isArray(policy) && policy.length > 0) {
    data.policy = await writerFile(Attachment, policy[0]);;
  } else {
    delete data.policy;
  }

  const filesIds = await Promise.all(extraFiles
    .filter(file => !_.isNil(file.content))
    .map(file =>
      writerFile(Attachment, file)
  ));

  data.extraFiles = data.extraFiles.
    filter(
      file => !_.isNil(file._id)
    ).map(
      file => file._id
    ).concat(filesIds);

  const cleanData = _.pick(data, STATUS_UPDATE_ALLOWED_FIELDS[data.status]);
  const updatedRequest = await updateRequestFieldsById(_id, cleanData, true);

  res.send({...cleanData, extraFiles});
}

exports.cancelRequest = async (req, res) => {
  const {
    username
  } = req;

  const {
    _id,
  } = req.body;
  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  if (!client.requests.includes(_id)) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const currentRequest = await findRequestById(_id);
  if (!_.includes(ALLOW_ACCEPT_CANCEL_STATUSES, currentRequest.status)) {
    throw Boom.badRequest("Cannot cancel request with such status", { requestId: _id });
  }

  await Promise.all([
    removeRequestFromClientById(client._id, _id),
    deleteRequestById(_id),
    deleteSampledRequestById(_id),
    deleteOftenSampledRequestById(_id),
  ]);

  const notifications = await findNotificationByRequestId(_id);
  await Promise.all(notifications.map(notification => {
    const query = notification.ownerType === "client"
      ? deleteClientNotificationByIds(notification.ownerId, notification._id)
      : deleteProviderNotificationByIds(notification.ownerId, notification._id);

    return Promise.all([
      query,
      deleteNotificationById(notification._id),
    ]);
  }));

  [currentRequest.policy, ...currentRequest.extraFiles].forEach(fileId =>
    Attachment.unlink({_id: fileId}, err => {
      if (!_.isNil(err)) {
        logger.error("Failed deleting file", { fileId, err });
      }
  }));

  res.sendStatus(204);
}

exports.downloadFile = async (req, res) => {
  const {
    username
  } =  req;

  const {
    requestId,
    fileId,
  } = req.query;

  const [user, client] = await getClient(username);
  await downloadFile(client, requestId, fileId, res);
}

exports.deleteFile = async (req, res) => {
  const {
    username
  } =  req;

  const {
    fileId,
  } = req.body;
  const { Attachment } = internals;

  const [user, client] = await getClient(username);
  const request = await findRequestByExtraFileId(fileId);
  if (!client.requests.includes(request._id)) {
    throw Boom.unauthorized("Request not belong to client");
  }

  if (request.extraFiles.length === 1) {
    throw Boom.badRequest("Extra files must include atleast one file");
  }

  await removeFileFromExtraFiles(request._id, fileId);
  Attachment.unlink({_id: fileId}, err => {
    if (!_.isNil(err)) {
      logger.error("Failed deleting file", { fileId, err });
    }
  });

  res.sendStatus(204);
}

exports.readNotification = async (req, res) => {
  const {
    username
  } =  req;

  const {
    notificationId,
  } = req.body;

  const [user, client] = await getClient(username);

  await readNotification(client, notificationId, readNotificationInClientById);
  res.sendStatus(204)
}

exports.getMessages = async (req, res) => {
  const {
    username
  } = req;

  const {
    requestId,
  } = req.query;

  const [user, client] = await getClient(username);
  const request = await findRequestById(requestId)
  if (request.author !== client._id.toString()) {
    throw Boom.unauthorized("_id not belong to client");
  }

  const messages = await prepareRequestsMessages([ request ]);

  res.send(_.first(messages));
  res.sendStatus(204);
}

exports.updatesDetailes = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  const newClient = _.pick(req.body, [
    "name",
    "email",
    "companyId",
    "address",
    "phoneNumber",
    "owner",
    "fieldOfActivity",
  ]);
  await ClientModel.yupUpdateClientSchema.validate(newClient);
  const newUser = _.pick(req.body, ["email"]);
  await UserModel.yupUpdateUserSchema.validate(newUser);

  await updateClientById(client._id, {$set: newClient});
  await updateUserById(user._id, {$set: newUser});
  res.sendStatus(204);
}

exports.updatesNotificationSettings = async (req, res) => {
  const {
    username
  } = req;

  const [user, client] = await getClient(username);

  const notificationSettings = _.pick(req.body, CLIENT_NOTIFICATIONS_TYPES.map(notificationType =>
    NOTIFICATIONS_TYPES[notificationType]
  ));
  await ClientModel.yupUpdateClientNotificationSchema.validate(notificationSettings);

  await updateClientById(client._id, {$set: {"settings.emailNotifications": notificationSettings}});
  res.sendStatus(204);
}
