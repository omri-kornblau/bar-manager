const Mongoose = require("mongoose");
const Yup = require("yup");

const { OBJECT_ID_LENGTH } = require("../config/consts");

const yupMessageSchema = Yup.object().shape({
    body: Yup.string(),
    from: Yup.string().length(OBJECT_ID_LENGTH),
    time: Yup.date(),
});

const mongoFormat = {
  body: {
    type: String
  },
  from: {
      type: String
  },
  time: {
    type: Date
  },
};

const messageSchema = new Mongoose.Schema(mongoFormat);

messageSchema.pre("save", async function () {
  await yupMessageSchema.validate(this);
});

const Message = Mongoose.model("Message", messageSchema);

module.exports = Message;
