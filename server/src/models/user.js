const Mongoose = require("mongoose");

const mongoFormat = {
  name: {
    type: String
  },
  phoneNumber: {
    type: Number
  }
};

const mongoOptions = {
  timestamps: true,
  minimize: false,
};

// Set 'minimize: false' to allow empty objects in
const requestScheme = new Mongoose.Schema(mongoFormat, mongoOptions);

const Request = Mongoose.model("Request", requestScheme);

module.exports = Request;
