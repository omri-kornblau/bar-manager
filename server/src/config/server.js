const _ = require("lodash");

const {
  PORT,
  NODE_ENV,
  SECRET_KEY,
  HOST_IP,
  MAX_USER_LOGINS,
  MONGO_DB
} = process.env;

module.exports = {
  address: HOST_IP || "0.0.0.0",
  port: PORT || 5000,
  enviornment: NODE_ENV,
  production: NODE_ENV === "production",
  secretTokenKey: SECRET_KEY || "secret",
  maxUserLogins: MAX_USER_LOGINS || 10,
  requestSizeLimit: "100mb",
  dbUri: `mongodb://${MONGO_DB || "localhost"}/gse`,
  fsDbUri: `mongodb://${MONGO_DB || "localhost"}/gse-fs`,
}
