const ButtonModel = require("../models/button")

const insertButton = async (buttonData) => {
  const {
    name,
    method,
    url
  } = buttonData

  const newButton = new ButtonModel({
    name,
    method,
    url
  })

  await newButton.save()
}

const findAllButtons = async () => {
  const buttons = await ButtonModel.find({})
  return buttons
}

const removeAllButtons = async () => {
  await ButtonModel.remove({})
}

module.exports = {
  insertButton,
  findAllButtons,
  removeAllButtons
}
