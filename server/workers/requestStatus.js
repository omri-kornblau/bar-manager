const _ = require("lodash");
const Moment = require("moment");
const Mongoose = require("mongoose");

const { moveMongoDocument } = require("../utils");

const {
  STATUS_TIMING,
  SHORT_SAMPLE_INTERVAL,
  LONG_SAMPLE_INTERVAL
} = require("../config/consts");
const { createClientNotification } = require("../routes/utils");

const { updateRequestById, findRequestById, deleteRequestById, removeAllOffersButOne } = require("../db/request");
const { removeRequestFromClientById } = require("../db/client");
const { findOfferById } = require("../db/offer");
const { removeRequestFromProviderById } = require("../db/provider");

const SampledModel = Mongoose.model("SampledRequest");
const OftenSampledModel = Mongoose.model("OftenSampledRequest");

const StatusWorker = {};

const isProcedureEnd = targetStatus => {
  return targetStatus !== "inTenderProcedure";
}

const updateProjectionById = async (id, updateOp) => {
  const updatedProjection = await OftenSampledModel.findByIdAndUpdate(id, updateOp, { new: true });
  if (_.isNil(updatedProjection)) return console.error(`Failed updating status of projection [${id}]`);
  return updatedProjection;
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
      return console.log(`Removed request [${requestId}] from samplers`);
    }

    const {
      endTimeKey,
      targetStatus
    } = STATUS_TIMING[status];

    if (_.isNil(projection[endTimeKey])) console.error(`Time key is missing from request [${_id}]`);

    const endTime = Moment(projection[endTimeKey]);
    console.log(`sampleOften: [${_id}] ${now.diff(endTime)}`);

    const updateStatusOp = { $set: { status: targetStatus } };
    const restoreStatusOp = { $set: { status } };

    if (now.isAfter(endTime)) {
      if (isProcedureEnd(targetStatus)) {
        const { offers: offersIds, author } = await findRequestById(requestId);
        if (_.isEmpty(offersIds)) {
          await deleteRequestById(requestId);
          await removeRequestFromClientById(author, requestId);
          await OftenSampledModel.findByIdAndRemove(_id);
          return;
        } else {
          const offers = await Promise.all(offersIds.map(findOfferById));
          const minOffer = _.minBy(offers, "price");
          await Promise.all(offers
            .filter(offer => offer._id !== minOffer._id)
            .map(offer => removeRequestFromProviderById(offer.provider, requestId)
          ));
          await removeAllOffersButOne(requestId, minOffer._id);
        }
      }

      const updatedRequest = await updateRequestById(requestId, updateStatusOp, true);

      const updatedProjection = await updateProjectionById(_id, updateStatusOp);
      if (_.isNil(updatedProjection)) {
        return await updateRequestById(requestId, restoreStatusOp);
      }
      console.log(`Updated request [${projection.requestId}] status to [${targetStatus}]`);

      await moveMongoDocument(updatedProjection, OftenSampledModel, SampledModel)
      console.log(`Moved request [${requestId}] to sampled`);

      await createClientNotification({
        type: "Status updated",
        status: targetStatus
      }, requestId, updatedRequest.author);
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
    } = STATUS_TIMING[status];

    if (_.isNil(projection[endTimeKey])) console.error(`Time key [${endTimeKey}] is missing from request [${_id}]`);

    const endTime = Moment(projection[endTimeKey])
      .subtract(LONG_SAMPLE_INTERVAL)
      .subtract(SHORT_SAMPLE_INTERVAL);

    console.log(`sample: [${_id}] ${now.diff(endTime)}`);

    if (now.isAfter(endTime)) {
      await moveMongoDocument(projection, SampledModel, OftenSampledModel);
      console.log(`Moved request [${requestId}] to often sampled`);
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
