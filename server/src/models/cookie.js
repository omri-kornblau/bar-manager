const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const Yup = require("yup");
const promisify = require("util").promisify;

const {
  HASH_LENGTH,
  SALT_LENGTH,
  USER_MIN_LENGTH,
  USER_MAX_LENGTH,
  SALT_ROUNDS,
} = require("../config/validation");

const hashCompare = promisify(Bcrypt.compare);
const hash = promisify(Bcrypt.hash);

const Utils = require("../utils");

const yupCookieSchema = Yup.object().shape({
  username: Yup.string().min(USER_MIN_LENGTH).max(USER_MAX_LENGTH),
  tokenPassword: Yup.string().length(HASH_LENGTH),
  salt: Yup.string().length(SALT_LENGTH),
});

const mongoFormat = {
  username: {
    type: String
  },
  tokenPassword: {
    type: String,
  },
  salt: {
    type: String
  }
}

const cookieSchema = new Mongoose.Schema(mongoFormat);

cookieSchema.pre("save", async function () {
  this.salt = Utils.getRandomPassword(SALT_LENGTH);
  this.tokenPassword = await hash(this.tokenPassword + this.salt, SALT_ROUNDS);
  await yupCookieSchema.validate(this)
});

cookieSchema.methods.isCorrectCookie = async function (tokenPassword) {
  return hashCompare(tokenPassword + this.salt, this.tokenPassword);
}

const Cookie = Mongoose.model("Cookie", cookieSchema);

module.exports = Cookie;
