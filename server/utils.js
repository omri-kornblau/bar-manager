const _ = require("lodash");

exports.getRandomPassword = length => {
  return Math.random().toString(36).slice(-1 * length);
}

exports.moveMongoDocument = async (doc, sourceModel, destModel) => {
  const newDoc = _.omit(doc._doc, "_id");

  const createdDoc = await destModel.create(newDoc);

  if (_.isNil(createdDoc)) return console.error(`Error while moving document [${doc._id}]`);

  await sourceModel.findByIdAndRemove(doc._id);
}

console.log("###################################");
console.log("# REMEBER TO UNCOMMENT THE WORKER #");
console.log("###################################");
