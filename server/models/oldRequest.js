const Mongoose = require("mongoose");

const Request = require("./request");

const OldRequest = Mongoose.model("OldRequest", Request.schema);

module.exports = OldRequest;
