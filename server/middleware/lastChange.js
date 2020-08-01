const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");
const Moment = require("moment");

const {
  updateClientById,
} = require("../db/client");

const {
  updateProviderById,
} = require("../db/provider");

const {
  getClient,
  getProvider,
} = require("../routes/utils");

const {
  CLIENT_INTERVAL,
} = require("../config/consts");

exports.clientChange = async (req, res, next) => {
  const {
    username,
  } = req;

  const [user, client] = await getClient(username);
  await updateClientById(client._id, {$set: {updatedAt: new Date()}});

  return next();
}

exports.isClientChange = async (req, res, next) => {
  const {
    username,
  } = req;

  const {
    force,
  } = req.query;

  if (!_.isNil(force)) {
    return next();
  }

  const [user, client] = await getClient(username);
  if (Moment().subtract(CLIENT_INTERVAL) < client.updatedAt) {
    return next();
  }

  res.send("NO CHANGE");
}

exports.providerChange = async (req, res, next) => {
  const {
    username,
  } = req;

  const [user, provider] = await getProvider(username);
  await updateProviderById(provider._id, {$set: {updatedAt: new Date()}});

  return next();
}

exports.isProviderChange = async (req, res, next) => {
  const {
    username,
  } = req;

  const {
    force,
  } = req.query;

  if (!_.isNil(force)) {
    return next();
  }

  const [user, provider] = await getProvider(username);
  if (Moment().subtract(CLIENT_INTERVAL) < provider.updatedAt) {
    return next();
  }

  res.send("NO CHANGE");
}
