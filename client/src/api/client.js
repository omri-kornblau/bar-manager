import Axios from "axios";

export const getClient = async () => {
  return Axios.get("/client/get");
}

export const postCreateRequest = async request => {
  return Axios.post("/client/newrequest", request)
}

export const postUpdateRequest = async request => {
  return Axios.post("/client/updaterequest", request)
}
