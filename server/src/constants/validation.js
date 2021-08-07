const _ = require("lodash");

// Validation
exports.OBJECT_ID_LENGTH  = 24;
exports.NAME_MIN_LENGTH = 3;
exports.NAME_MAX_LENGTH = 50;
exports.HASH_LENGTH = 60;
exports.SALT_LENGTH = 8;
exports.PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// Auth
exports.USER_MIN_LENGTH = 3;
exports.USER_MAX_LENGTH = 20;
exports.NAME_MIN_LENGTH = 3;
exports.NAME_MAX_LENGTH = 50;
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 25;
exports.SALT_ROUNDS = 10;

//
exports.MAX_MESSAGE_LENGTH = 1000;
exports.MAX_NOTIFICATION_LENGTH = 100;
