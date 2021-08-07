import Axios from "axios"

const getButtons = async () => {
  const res = await Axios.get("/api/buttons")

  return res.data
}

const postAddButton = async (data) => {
  await Axios.post("/api/button/add", data)
}

const postClearButtons = async () => {
  await Axios.post("/api/buttons/clear")
}

export {
  getButtons,
  postAddButton,
  postClearButtons
}
