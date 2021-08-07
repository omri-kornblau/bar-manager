const Yup = require("yup");

const ButtonModel = require("../models/button")

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
  const {
    name,
    httpRequest
  } = req.body

  const newButton = new ButtonModel({
    name,
    httpRequest
  })

  await newButton.save()

  res.send();
}

const getButtons = async (req, res) => {
  const buttons = await ButtonModel.find({})

  res.send(buttons)
}

const postClearButtons = async (req, res) => {
  await ButtonModel.remove({})

  res.send()
}

module.exports = createRoutes()
