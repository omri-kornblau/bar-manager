const _ = require("lodash");

const { USER_TYPES } = require("../types");

exports.OBJECT_ID_LENGTH  = 24;
exports.STATUSES  = ["active"];
exports.USER_TYPES_VALUES  = _.values(USER_TYPES);
exports.USER_MIN_LENGTH = 3;
exports.USER_MAX_LENGTH = 20;
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 25;
exports.HASH_LENGTH = 60;
exports.SALT_LENGTH = 16;
exports.SALT_ROUNDS = 10;
