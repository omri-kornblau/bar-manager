const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const Yup = require("yup");
const promisify = require("util").promisify;

const {
  OBJECT_ID_LENGTH,
  USER_TYPES,
  USER_MIN_LENGTH,
  USER_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  SALT_ROUNDS,
} = require("./consts");

const hashCompare = promisify(Bcrypt.compare);
const hash = promisify(Bcrypt.hash);

const yupUserFormat = Yup.object().shape({
  email: Yup.string().email(),
  username: Yup.string().min(USER_MIN_LENGTH).max(USER_MAX_LENGTH),
  password: Yup.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
  type: Yup.mixed().oneOf(USER_TYPES),
  data: Yup.string().length(OBJECT_ID_LENGTH),
});

const mongoFormat = {
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  type: {
    type: String
  },
  data: {
    type: String
  },
}

const userSchema = new Mongoose.Schema(mongoFormat);

userSchema.pre("save", async function () {
  await yupUserFormat.validate(this);
  this.password = await hash(this.password, SALT_ROUNDS);
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await hashCompare(password, this.password);
}

const User = Mongoose.model("User", userSchema);

module.exports = User;
