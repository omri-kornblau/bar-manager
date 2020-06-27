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
    "isCurrentlyInsured"
  ]
}
exports.ALLOW_ACCEPT_CANCEL_STATUSES = ["waitingForApproval"];
exports.IN_TENDER_PROCEDURE_DURATION = Moment.duration(3, "days");
exports.WAITING_FOR_SIGN_DURATION = Moment.duration(10, "days");
