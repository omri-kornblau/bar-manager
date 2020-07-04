const Mongoose = require("mongoose");
const Yup = require("yup");

const { OBJECT_ID_LENGTH } = require("../config/consts");

const yupOfferSchema = Yup.object().shape({
  provider: Yup.string().length(OBJECT_ID_LENGTH),
  request: Yup.string().length(OBJECT_ID_LENGTH),
  price: Yup.number().integer().positive(),
  time: Yup.date(),
});

const mongoFormat = {
  provider: {
    type: String
  },
  request: {
      type: String
  },
  price: {
      type: Number
  },
  time: {
      type: Date
  },
  mtime: {
      type: Date
  },
};

const offerSchema = new Mongoose.Schema(mongoFormat);

offerSchema.pre("save", async function () {
  await yupOfferSchema.validate(this);
});

const Offer = Mongoose.model("Offer", offerSchema);

module.exports = Offer;
