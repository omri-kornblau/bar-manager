const _ = require("lodash");

exports.getRandomPassword = length => {
  return Math.random().toString(36).slice(-1 * length);
}
