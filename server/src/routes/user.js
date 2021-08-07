const Yup = require("yup");
const {
  PHONE_REGEX,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH
} = require("../constants/validation");

const createRoutes = () => [
  {
    method: "post",
    path: "/api/user/init",
    scheme: {
      body: Yup.object().shape({
        phoneNumber: Yup.string()
          .matches(PHONE_REGEX)
          .required(),
        name: Yup.string()
          .min(NAME_MIN_LENGTH)
          .max(NAME_MAX_LENGTH)
          .required()
      })
    },
    handler: postInitialLogin,
    middleware: null
  }
];

const postInitialLogin = (req, res) => {
  res.send();
}

module.exports = createRoutes()
