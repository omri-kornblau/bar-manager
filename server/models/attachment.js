const { createModel } = require("mongoose-gridfs");

const internals = {};

exports.createAttachment = () => {
  internals.Attachment = createModel();
}

exports.internals = internals;
