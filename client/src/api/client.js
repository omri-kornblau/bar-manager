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

export const postAcceptRequest = async _id => {
  return Axios.post("/client/acceptrequest", {_id})
}

export const postCancelRequest = async _id => {
  return Axios.post("/client/cancelrequest", {_id})
}

export const postReadNotification = async notificationId => {
  return Axios.post("/client/readnotification", {notificationId})
}
