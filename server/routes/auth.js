const _ = require("lodash");
const Mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const Boom = require("boom");
const Bcrypt = require("bcrypt");
const promisify = require("util").promisify;
const hash = promisify(Bcrypt.hash);

const Utils = require("../utils");
const {
  censorUserForUser
} = require("../censors");

const {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  SALT_ROUNDS,
} = require("../config/consts")

const {
  findUser,
  changePassword,
  updateUserById,
  updateLastLogin,
} = require("../db/user");

const UserModel = Mongoose.model("User");
const CookieModel = Mongoose.model("Cookie");

const {
  secretTokenKey,
  maxUserLogins
} = require("../config/server");

exports.login = async (req, res) => {
  const {
    username: loginId,
    password
  } = req.body;
  const user = await UserModel.findOne({$or: [
    {username: loginId},
    {email: loginId},
  ]});

  if (!user) {
    throw Boom.badRequest("Incorrect username or password");
  }
  const isCorrect = await user.isCorrectPassword(password);
  if (!isCorrect) {
    throw Boom.badRequest("Incorrect username or password");
  }

  const tokenPassword = Utils.getRandomPassword(16);
  const {username} = user

  const payload = {
    username,
    tokenPassword
  }
  const {
    stay
  } = req.query;
  const cookieAmount = await CookieModel.countDocuments({
    username
  });

  if (cookieAmount >= maxUserLogins) {
    const oldCookies =
      await CookieModel.find({
        username
      }).sort({
        _id: -1
      }).limit(maxUserLogins - cookieAmount + 1);
    const oldCookeiIds = oldCookies.map(cookie => cookie._id);
    await CookieModel.remove({
      _id: {
        $in: oldCookeiIds
      }
    });
  }
  await CookieModel.create(payload);
  const tokenOptions = stay ? null : {
    expiresIn: "12h"
  };
  const token = Jwt.sign(payload, secretTokenKey, tokenOptions);

  updateLastLogin(user._id);
  return res.cookie("token", token, {
    httpOnly: true
  }).send(censorUserForUser(user._doc));
}

exports.checkToken = async (req, res) => {
  const token = req.cookies.token;
  const {
    username,
  } = await Jwt.verify(token, secretTokenKey)
  const user = await UserModel.findOne({ username });
  res.send(censorUserForUser(user));
}

exports.logout = async (req, res) => {
  const token = req.cookies.token;
  const {
    username,
    tokenPassword
  } = await Jwt.verify(token, secretTokenKey)
  const userCookies = await CookieModel.find({
    username
  });
  const cookieValids = await Promise.all(userCookies.map(cookie =>
    cookie.isCorrectCookie(tokenPassword)
  ));
  // There will be at least one cookie because this
  // route has 'withAuth' middleware
  const foundCookieIdx = _.findIndex(cookieValids);
  await CookieModel.remove(userCookies[foundCookieIdx]);
  res.send();
}

exports.changePassword = async (req, res) => {
  const {
    username
  } = req;

  const {
    previosPassword,
    newPassword,
  } = req.body;

  if (newPassword.length < PASSWORD_MIN_LENGTH) {
    throw Boom.badRequest(JSON.stringify({
      message: "Password to short",
      min: PASSWORD_MIN_LENGTH,
      path: "newPassword",
    }));
  }
  if (newPassword.length > PASSWORD_MAX_LENGTH) {
    throw Boom.badRequest(JSON.stringify({
      message: "Password to long",
      max: PASSWORD_MAX_LENGTH,
      path: "newPassword",
    }));
  }

  const user = await findUser(username);
  const isCorrect = await user.isCorrectPassword(previosPassword);
  if (!isCorrect) {
    throw Boom.badRequest(JSON.stringify({
      message: "Incorrect password",
      path: "previosPassword",
    }));
  }

  const password = await hash(newPassword, SALT_ROUNDS);
  await changePassword(user._id, password);

  res.sendStatus(204);
}
