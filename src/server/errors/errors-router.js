const _ = require("lodash");
const Boom = require("boom");

const logger = require("../log/logger").logger;

const errorRoutes = [
  {
    condition: err => err.isBoom,
    handler: (res, err) => {
      res.status(err.output.statusCode).send(err.output.payload);
      logger.error(err.message, err.data);
    }
  },
  {
    // Yup validation error
    condition: err => err.name === "ValidationError" && !!err.path,
    handler: (res, err) => {
      res.status(400).send(Boom.badRequest(err));
    }
  },
  {
    // Mongoose validation error
    condition: err => err.name === "ValidationError" && !!err.errors && !err.path,
    handler: (res, err) => {
      err = _.extend(err, _.sample(err.errors).properties);
      delete err.errors;
      res.status(400).send(Boom.badRequest(err));
    }
  },
  {
    condition: err => err.name === "MongoError" && err.code === 11000,
    handler: (res, err) => res.status(400).send(
      Boom.badRequest(JSON.stringify({
        message: "Duplicate key",
        path: Object.keys(err.keyValue)[0],
      })).output.payload
    )
  }
];

exports.route = (req, res, next) => err => {
  const matchedAnyError = errorRoutes.some(route => {
    if (route.condition(err)) {
      route.handler(res, err);
      return true;
    }
  });

  if (!matchedAnyError) {
    logger.error("Unknown error", err);
  }

  return matchedAnyError ? null : next(err)
}
