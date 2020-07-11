const _ = require("lodash");
const Mongoose = require("mongoose");
const Boom = require("boom");

const UserModel = Mongoose.model("User");

exports.findUser = async (username) => {
  const user = await UserModel.findOne({username});

  if (_.isNil(user)) {
    throw Boom.internal("User not found");
  }
  return user;
}

exports.updateUserById = async (_id, action, returnNew=false) => {
  const updatedUser =
    await UserModel.findByIdAndUpdate(_id, action, { new: returnNew });

  if (_.isNil(updatedUser)) {
    throw Boom.internal("Failed updating user");
  }
}

exports.changePassword = async(_id, password) => {
  return exports.updateUserById(_id, {$set: {password}}, true);
}
