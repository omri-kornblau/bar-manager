const { createModel } = require("mongoose-gridfs");

const internals = {};

exports.createAttachment = connection => {
  internals.Attachment = createModel({
    connection: connection,
});
}

exports.internals = internals;
