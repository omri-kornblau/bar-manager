const _ = require("lodash");
const Moment = require("moment");
const Mongoose = require("mongoose");

const logger = require("../log/logger").logger;

const {
  moveMongoDocument,
} = require("../utils");

const {
  STATUS_TIMING,
  SHORT_SAMPLE_INTERVAL,
  LONG_SAMPLE_INTERVAL
} = require("../config/consts");
const {
  createClientNotification,
  createProviderNotification,
} = require("../routes/utils");

const {
  updateRequestById,
  findRequestById,
  deleteRequestById,
  removeAllOffersButOne
} = require("../db/request");
const { removeRequestFromClientById } = require("../db/client");
const { findOfferById } = require("../db/offer");
const { removeRequestFromProviderById } = require("../db/provider");

const SampledModel = Mongoose.model("SampledRequest");
const OftenSampledModel = Mongoose.model("OftenSampledRequest");
const RequestModel = Mongoose.model("Request");

const StatusWorker = {};

const isProcedureEnd = targetStatus => {
  return targetStatus !== "inTenderProcedure";
}

const isPolicyEnd = targetStatus => {
  return targetStatus === "history";
}

const findRequestAndDeleteIfMissing = async (requestId, sampledId) => {
  try {
    const request = await findRequestById(requestId);
    return request
  } catch (err) {
    if (err.message === "Request not found") {
      logger.error("Request not found from sampled", { sampledId, requestId });
      return await OftenSampledModel.findByIdAndRemove(sampledId);
    }
    throw err;
  }
}

const updateProjectionById = async (id, updateOp) => {
  const updatedProjection = await OftenSampledModel.findByIdAndUpdate(id, updateOp, { new: true });
  if (_.isNil(updatedProjection)) {
    return logger.error("Failed updating status of projection", { sampledId: id });
  }
  return updatedProjection;
}

const endNoOffersProcedure = async (request, sampledId) => {
  await OftenSampledModel.findByIdAndRemove(sampledId);
  await deleteRequestById(request._id);
  await removeRequestFromClientById(request.author, request._id);
  await createClientNotification({
    type: "Tender Procedure Without Offers",
  }, request._id, request.author);
}

const endProcedureWithOffers = async request => {
  const offers = await Promise.all(request.offers.map(findOfferById));
  const minOffer = _.minBy(offers, "price");
  await Promise.all(offers
    .filter(({ _id }) => _id !== minOffer._id)
    .map(({ provider }) =>
      Promise.all([
        removeRequestFromProviderById(provider, request._id),
        createProviderNotification({
            type: "Offer lose",
          }, request._id, provider)
      ])
    )
  );
  await removeAllOffersButOne(request._id, minOffer._id);
}

const endPolicy = async (request, sampledId) => {
  await OftenSampledModel.findByIdAndRemove(sampledId);
}

const sampleRequestsOften = async () => {
  const projections = await OftenSampledModel.find({});

  const now = Moment();

  return Promise.all(projections.map(async projection => {
    const {
      _id,
      status,
      requestId
    } = projection;

    if (_.isNil(STATUS_TIMING[status])) {
      await OftenSampledModel.findByIdAndRemove(_id);
      return logger.info("Removed request from samplers", { sampledId: _id, requestId });
    }

    const {
      endTimeKey,
      targetStatus
    } = STATUS_TIMING[status];

    if (_.isNil(projection[endTimeKey])) logger.error("Time key is missing from request", { sampledId: _id });

    const endTime = Moment(projection[endTimeKey]);
    logger.info("Sample often", { sampledId: _id, diff: now.diff(endTime), targetStatus });

    if (now.isAfter(endTime)) {
      const request = await findRequestAndDeleteIfMissing(requestId);

      if (isProcedureEnd(targetStatus)) {
        if (_.isEmpty(request.offers)) {
          logger.info("Ended procedure with no offers", { requestId });
          return await endNoOffersProcedure(request, _id);
        } else {
          await endProcedureWithOffers(request);
        }
      }

      const updateStatusOp = { $set: { status: targetStatus } };
      const restoreStatusOp = { $set: { status } };

      const updatedRequest = await updateRequestById(requestId, updateStatusOp, true);

      const updatedProjection = await updateProjectionById(_id, updateStatusOp);
      if (_.isNil(updatedProjection)) {
        return await updateRequestById(requestId, restoreStatusOp);
      }
      logger.info("Updated request status", { targetStatus, requestId: projection.requestId });

      await moveMongoDocument(updatedProjection, OftenSampledModel, SampledModel)
      logger.info("Moved request to sampled", { requestId });

      await createClientNotification({
        type: "Status updated",
        status: targetStatus
      }, requestId, updatedRequest.author);

      await createProviderNotification({
        type: "Status updated",
        status: targetStatus
      }, requestId, (await findOfferById(updatedRequest.offers[0])).provider);

      if (isPolicyEnd(targetStatus)) {
        await endPolicy(request, _id);
      }
    }
  }));
}

const sampleRequests = async () => {
  const projections = await SampledModel.find({});

  const now = Moment();

  return Promise.all(projections.map(async projection => {
    const {
      _id,
      status,
      requestId
    } = projection;

    if (_.isNil(STATUS_TIMING[status])) {
      await SampledModel.findByIdAndRemove(_id);
      return console.log(`Removed request [${requestId}] from samplers`);
    }

    const {
      endTimeKey,
      targetStatus
    } = STATUS_TIMING[status];

    if (_.isNil(projection[endTimeKey])) console.error(`Time key [${endTimeKey}] is missing from request [${_id}]`);

    const endTime = Moment(projection[endTimeKey])
      .subtract(LONG_SAMPLE_INTERVAL)
      .subtract(SHORT_SAMPLE_INTERVAL);

    logger.info("Sample", { sampledId: _id, diff: now.diff(endTime), targetStatus });

    if (now.isAfter(endTime)) {
      await moveMongoDocument(projection, SampledModel, OftenSampledModel);
      logger.info("Moved request to often sampled", { requestId });
    }
  }));
}

const safeInvoke = fn => () => {
  const err = _.attempt(fn);
  if (_.isError(err)) console.error(err)
}

StatusWorker.init = () => {
  setInterval(safeInvoke(sampleRequests), LONG_SAMPLE_INTERVAL);
  setInterval(safeInvoke(sampleRequestsOften), SHORT_SAMPLE_INTERVAL);
}

module.exports = StatusWorker;
