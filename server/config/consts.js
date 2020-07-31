const _ = require("lodash");
const Moment = require("moment");
const { USER_TYPES } = require("./types");

// Validation
exports.OBJECT_ID_LENGTH  = 24;
exports.USER_TYPES_VALUES  = _.values(USER_TYPES);
exports.HASH_LENGTH = 60;
exports.SALT_LENGTH = 8;

// Auth
exports.USER_MIN_LENGTH = 3;
exports.USER_MAX_LENGTH = 20;
exports.NAME_MIN_LENGTH = 3;
exports.NAME_MAX_LENGTH = 50;
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 25;
exports.SALT_ROUNDS = 10;

// Request
exports.ALLOW_UPDATE_STATUSES = ["inTenderProcedure"];
exports.STATUS_UPDATE_ALLOWED_FIELDS = {
  inTenderProcedure: [
    "maxPrice",
    "comments",
    "insuranceDuration",
    "assetDescription",
    "companyDescription",
    "isCurrentlyInsured",
    "policy",
    "extraFiles",
  ]
}

exports.ALLOW_ACCEPT_CANCEL_STATUSES = ["inTenderProcedure"];
exports.ALLOW_SET_OFFER_STATUSES = ["inTenderProcedure"];

exports.CLIENT_INTERVAL = Moment.duration(2, "seconds");

// Request Status Worker
exports.LONG_SAMPLE_INTERVAL = Moment.duration(10, "seconds");
exports.SHORT_SAMPLE_INTERVAL = Moment.duration(2, "seconds")
exports.STATUS_TIMING = {
  inTenderProcedure: {
    endTimeKey: "startDate",
    duration: Moment.duration(3, "minutes"),
    targetStatus: "waitingForSign"
  },
  waitingForSign: {
    endTimeKey: "activeTime",
    duration: Moment.duration(30, "minutes"),
    targetStatus: "active"
  }
};

// Request Pool
exports.REQUESTS_POOL_STATUSES = ["inTenderProcedure"];

exports.MAX_MESSAGE_LENGTH = 1000;
