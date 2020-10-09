import Axios from "axios";

export const postSignup = async data => {
  return Axios.post("/client/signup", data);
}

export const getClient = async (forceRequest=false) => {
  const data = forceRequest ? { force: true } : {};
  const now = new Date();
  return Axios.get("/client/get", { params: {...data, t: now.getTime() }});
}

export const postCreateRequest = async request => {
  return Axios.post("/client/newrequest", request);
}

export const postUpdateRequest = async request => {
  return Axios.post("/client/updaterequest", request);
}

export const postAcceptRequest = async _id => {
  return Axios.post("/client/acceptrequest", {_id});
}

export const postCancelRequest = async _id => {
  return Axios.post("/client/cancelrequest", {_id});
}

export const postReadNotification = async notificationId => {
  return Axios.post("/client/readnotification", {notificationId});
}

export const postSendMessage = async (requestId, providerId, body) => {
  return Axios.post("/client/sendmessage", { requestId, providerId, body });
}

export const getMessages = async requestId => {
  return Axios.get(`/client/messages?requestId=${requestId}`);
}

export const postDeleteFile = async fileId => {
  return Axios.post("/client/deletefile", {fileId});
}
