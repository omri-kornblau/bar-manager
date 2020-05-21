const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  STATUSES
} = require("./consts");

const yupRequestSchema = Yup.object().shape({
  messages: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  author: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
  expirationDate: Yup.date(),
  status: Yup.mixed().oneOf(STATUSES),
  offers: Yup.array().of(Yup.string().length(OBJECT_ID_LENGTH)),
});

const mongoFormat = {
  messages: {
    type: Array
  },
  author: {
    type: String
  },
  expirationDate: {
    type: Date
  },
  status: {
    type: String
  },
  offers: {
    type: Array
  },
};

const requestScheme = new Mongoose.Schema(mongoFormat);

requestScheme.pre("save", async function () {
  await yupRequestSchema.validate(this);
});

const Request = Mongoose.model("Request", requestScheme);

module.exports = Request;
