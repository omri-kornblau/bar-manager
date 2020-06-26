const _ = require("lodash");
const Mongoose = require("mongoose");
const { Readable } = require("stream")

const UserModel = Mongoose.model("User");
const ClientModel = Mongoose.model("Client");

exports.findByIds = async (Model, ids, error) => {
  const promises = ids.map(_id => (
    Model.findById(_id)
  ));

  const res = await Promise.all(promises);
  if (res.some(_.isEmpty)) {
    throw Boom.internal(error);
  }
  return res;
}

exports.prepareRequests = async requests => {
  const promise = requests.map(request => (
    UserModel.findById(request.author)
  ))

  const authors = await Promise.all(promise);
  return requests.map((request, index) => {
    return {...request._doc, author: authors[index].username};
  }); 
}

exports.getClient = async username => {
  const user = await UserModel.findOne({username});
  if (!user) {
    throw Boom.internal("User not found");
  }

  const client = await ClientModel.findById(user.clientId);
  if (!client) {
    throw Boom.internal("Client not found");
  }

  return [user, client];
}

exports.writerFile = (attachment, file) => {
  return new Promise((resolve, reject) => {
    const readable = Readable.from([file.content]);
    attachment.write({filename: file.name}, readable, (error, file) => {
      if (error !== null) {
        return reject();
      }
      return resolve(file._id);
    });
  });
}

exports.readFile = (attachment, _id) => {
  return new Promise((resolve, reject) => {
    attachment.read({_id}, (error, buffer) => {
      if (error != null) {
        return reject();
      }
      return resolve(buffer);
    })
  })
}
