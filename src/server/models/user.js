const Mongoose = require("mongoose");
const Yup = require("yup");
const Moment = require("moment");

const {
  OBJECT_ID_LENGTH,
} = require("../config/validation");

const mongoFormat = {
  type: {
    type: String
  }
};

const mongoOptions = {
  timestamps: true,
  minimize: false,
};

// Set 'minimize: false' to allow empty objects in
const requestScheme = new Mongoose.Schema(mongoFormat, mongoOptions);

requestScheme.pre("save", async function () {
  await yupCreateRequestSchema.validate(this);
});

const Request = Mongoose.model("Request", requestScheme);

Request.yupCreateRequestSchema = yupCreateRequestSchema;
Request.yupUpdateRequestSchema= yupUpdateRequestSchema;

module.exports = Request;
