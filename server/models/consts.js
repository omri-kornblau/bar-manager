const _ = require("lodash");

const { USER_TYPES } = require("../types");

exports.OBJECT_ID_LENGTH  = 24;
exports.USER_TYPES_VALUES  = _.values(USER_TYPES);
exports.HASH_LENGTH = 60;
exports.SALT_LENGTH = 8;
exports.INSURENSE_TYPES = ["typeA", "typeB", "typeC"]
