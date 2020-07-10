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
    createdTime: new Date(),
    startDate: undefined,
    activeTime: undefined,
    messages: [],
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

exports.updateFirstAcceptById = async (_id, userId) => {
  return exports.updateRequestById(
    _id,
    { $set: { firstAccept: userId } },
    true
  );
}

exports.updateSecondAcceptById = async (_id, userId) => {
  const now = Moment();

  return exports.updateRequestById(
    _id,
    {
      $set: {
        secondAccept: userId,
        status: "inTenderProcedure",
        startDate: now.clone()
          .add(STATUS_TIMING.inTenderProcedure.duration),
        activeTime: now.clone()
          .add(STATUS_TIMING.inTenderProcedure.duration)
          .add(STATUS_TIMING.waitingForSign.duration),
      }
    },
    true
  );
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

exports.addMessage = async (requestId, messageId) => {
  return exports.updateRequestById(
    requestId,
    {
      $push: {
        messages: messageId,
      }
    },
    true
  )
}

exports.removeMessage = async (requestId, messageId) => {
  return exports.updateRequestById(
    requestId,
    {
      $pull: {
        messages: messageId,
      }
    },
    true
  )
}

exports.getProviderRequests = async (types, existsRequests, skip, limit) => {
  return RequestModel
    .find({
      status: { $in: REQUESTS_POOL_STATUSES },
      type: { $in: types },
      _id: {
        $nin: existsRequests
      },
    }, REQUEST_FOR_PROVIDER_ALL_REQUESTS)
    .skip(skip)
    .limit(limit);
}
