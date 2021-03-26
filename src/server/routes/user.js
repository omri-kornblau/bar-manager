const Yup = require("yup");
const { 
  PHONE_REGEX, 
  NAME_MIN_LENGTH, 
  NAME_MAX_LENGTH 
} = require("../config/validation");

module.exports = [
  {
    method: "post",
    path: "/api/initialLogin",
    scheme: { 
      body: Yup.object().shape({
        phoneNumber: Yup.string().matches(PHONE_REGEX),
        name: Yup.string()
          .min(NAME_MIN_LENGTH)
          .max(NAME_MAX_LENGTH) 
      })
    },
    handler: postInitialLogin,
    middleware: null
  }
];

const postInitialLogin = (req, res) => {
  res.send();
}
