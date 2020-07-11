const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");
const Moment = require("moment");

const RequestModel = Mongoose.model("Request");

const { yupUpdateRequestSchema } = require("../models/request");

const {
  STATUS_TIMING,
  REQUESTS_POOL_STATUSES,
} = require("../config/consts");
const {
  REQUEST_FOR_PROVIDER_ALL_REQUESTS
} = require("../config/projections");

exports.createRequest = async requestData => {
  const createdRequest = await RequestModel.create({
    createdAt: new Date(),
    startDate: new Date,
    activeTime:  new Date,
    messages: {},
    offers: [],
    firstAccept: "",
    secondAccept: "",
    ...requestData
  })

  if (_.isNil(createdRequest)) {
    console.error(`Failed creating request for user ${requestData.author}`)
    throw Boom.internal(`Failed creating request`);
  }

  return createdRequest;
}

exports.deleteRequestById = _id => {
  return RequestModel.findByIdAndDelete(_id);
}

exports.findRequestById = async _id => {
  const request = await RequestModel.findById(_id);

  if (_.isNil(request)) {
    throw Boom.internal("Request not found");
  }
  return request;
}

exports.findRequest = async query => {
  const request = await RequestModel.findOne(query);

  if (_.isNil(request)) {
    throw Boom.internal("Request not found");
  }
  return request;
}

exports.findRequestByFileId = async fileId => {
  return await exports.findRequest({
    $or: [
      {
        policy: Mongoose.Types.ObjectId(fileId)
      }, {
        extraFiles: Mongoose.Types.ObjectId(fileId)
      }
    ]
  });
}

exports.findRequestByExtraFileId = async fileId => {
  return await exports.findRequest({
    extraFiles: Mongoose.Types.ObjectId(fileId)
  });
}

exports.updateRequestFieldsById = async (_id, data, validate=true) => {
  if (validate) {
    await yupUpdateRequestSchema.validate(data);
  }

  const updatedRequest = await RequestModel.findByIdAndUpdate(
    _id,
    { $set: { ...data } },
    { new: true}
  );

  if (_.isNil(updatedRequest)) {
    throw Boom.internal("Failed updating request");
  }

  return updatedRequest;
}

exports.updateRequestById = async (_id, action, returnNew=false) => {
  const updatedRequest = await RequestModel.findByIdAndUpdate(_id, action, { new: returnNew });

  if (_.isNil(updatedRequest)) {
    throw Boom.internal("Failed updating request");
  }

  return updatedRequest;
}

exports.addOffer = async (requestId, offerId) => {
  return exports.updateRequestById(
    requestId,
    {
      $addToSet: {
        offers: offerId,
      }
    },
    true
  )
}

exports.removeOffer = async (requestId, offerId) => {
  return exports.updateRequestById(
    requestId,
    {
      $pull: {
        offers: offerId,
      }
    },
    true
  )
}

exports.removeFileFromExtraFiles = async (requestId, fileId) => {
  return exports.updateRequestById(
    requestId,
    {
      $pull: {
        extraFiles: Mongoose.Types.ObjectId(fileId)
      }
    },
    true
  )
}

exports.addMessage = async (requestId, messageId, providerId) => {
  const messagesPath = `messages.${providerId}`;
  return exports.updateRequestById(
    requestId,
    {
      $push: {
        [messagesPath]: messageId
      }
    },
    true
  )
}

exports.removeMessage = async (requestId, messageId, providerId) => {
  const messagesPath = `messages.${providerId}`;
  return exports.updateRequestById(
    requestId,
    {
      $pull: {
        [messagesPath]: messageId
      }
    },
    true
  )
}

exports.getProviderRequests = async (types, existsRequests, skip, limit) => {
  const query = {
    status: { $in: REQUESTS_POOL_STATUSES },
    type: { $in: types },
    _id: {
      $nin: existsRequests
    },
  };
  return await Promise.all([
    RequestModel
      .find(query, REQUEST_FOR_PROVIDER_ALL_REQUESTS)
      .skip(skip)
      .limit(limit),
    RequestModel.count(query),
  ])
}
