const _ = require("lodash");
const Mongoose = require("mongoose");

exports.getRandomPassword = length => {
  return Math.random().toString(36).slice(-1 * length);
}

exports.moveMongoDocument = async (doc, sourceModel, destModel) => {
  const newDoc = doc._doc;

  const createdDoc = await destModel.create(newDoc);

  if (_.isNil(createdDoc)) return console.error(`Error while moving document [${doc._id}]`);

  await sourceModel.findByIdAndRemove(doc._id);
}
