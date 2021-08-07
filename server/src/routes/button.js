const Yup = require("yup");
const {
  insertButton,
  findAllButtons,
  removeAllButtons
} = require("../collections/buttons");

const createRoutes = () => [
  {
    method: "post",
    path: "/api/button/add",
    scheme: {
      body: Yup.object().shape({
        name: Yup.string().required(),
        method: Yup.string().oneOf(["get", "post"]).required(),
        url: Yup.string().required()
      })
    },
    handler: postAddButton,
    middleware: null
  },
  {
    method: "get",
    scheme: {},
    path: "/api/buttons",
    handler: getButtons,
    middleware: null
  },
  {
    method: "post",
    scheme: {},
    path: "/api/buttons/clear",
    handler: postClearButtons,
    middleware: null
  }
];

const postAddButton = async (req, res) => {
  await insertButton(req.body)
  res.send();
}

const getButtons = async (req, res) => {
  const buttons = await findAllButtons()
  res.send(buttons)
}

const postClearButtons = async (req, res) => {
  await removeAllButtons()
  res.send()
}

module.exports = createRoutes()
