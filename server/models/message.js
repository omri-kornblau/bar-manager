const Mongoose = require("mongoose");
const Yup = require("yup");

const {
  OBJECT_ID_LENGTH,
  MAX_MESSAGE_LENGTH,
} = require("../config/consts");

const yupMessageSchema = Yup.object().shape({
    body: Yup.string().min(1).max(MAX_MESSAGE_LENGTH).required(),
    from: Yup.string().length(OBJECT_ID_LENGTH).required(),
    timestamp: Yup.date().required(),
});

const mongoFormat = {
  body: {
    type: String
  },
  from: {
    type: String
  },
  timestamp: {
    type: Date
  },
};

const messageSchema = new Mongoose.Schema(mongoFormat);

messageSchema.pre("save", async function () {
  await yupMessageSchema.validate(this);
});

const Message = Mongoose.model("Message", messageSchema);

module.exports = Message;
