const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const Yup = require("yup");
const promisify = require("util").promisify;

const {
  OBJECT_ID_LENGTH,
  USER_TYPES_VALUES,
  USER_MIN_LENGTH,
  USER_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  SALT_ROUNDS,
} = require("../config/consts");

const hashCompare = promisify(Bcrypt.compare);
const hash = promisify(Bcrypt.hash);

const yupUserSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  username: Yup.string().min(USER_MIN_LENGTH).max(USER_MAX_LENGTH).required(),
  password: Yup.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).required(),
  type: Yup.mixed().oneOf(USER_TYPES_VALUES).required(),
  clientId: Yup.string().length(OBJECT_ID_LENGTH).required(),
});

const yupUpdateUserSchema = Yup.object().shape({
  email: Yup.string().email().required(),
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
  clientId: {
    type: String
  },
}

const userSchema = new Mongoose.Schema(mongoFormat);

userSchema.pre("save", async function () {
  await yupUserSchema.validate(this);
  this.password = await hash(this.password, SALT_ROUNDS);
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await hashCompare(password, this.password);
}

const User = Mongoose.model("User", userSchema);
User.yupUserSchema = yupUserSchema;
User.yupUpdateUserSchema = yupUpdateUserSchema;

module.exports = User;
