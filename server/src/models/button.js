const Mongoose = require("mongoose");

const mongoFormat = {
  name: {
    type: String
  },
  method: {
    type: String
  },
  url: {
    type: String
  }
};

const mongoOptions = {
  timestamps: true,
  minimize: false,
};

// Set 'minimize: false' to allow empty objects in
const requestScheme = new Mongoose.Schema(mongoFormat, mongoOptions);

const Button = Mongoose.model("Button", requestScheme);

module.exports = Button;
