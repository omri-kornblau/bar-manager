const _ = require("lodash");
const Boom = require("boom");
const { internals } = require("../models/attachment");

exports.findFileById = async fileId => {
  const { Attachment } = internals;

  const file = await Attachment.findById(fileId);
  if (_.isNil(file)) {
    throw Boom.internal("File not found");
  }
  return file;
}
