import Axios from "axios";

export const postSignup = async data => {
  return Axios.post("/provider/signup", data);
}

export const getProvider = async (forceRequest=false) => {
  const data = forceRequest ? { force: true } : {};
  return Axios.get("/provider/get", { params: data });
}

export const postFilteredRequests = async (type, filters, skip, limit) => {
  return Axios.post("/provider/filteredrequests", { type, filters, skip, limit });
}

export const getFetchRequest = async (requestId, forceRequest=false) => {
  const data = forceRequest ? { force: true } : {};
  return Axios.get("/provider/fetchrequest", {
    params: {requestId, ...data},
  });
}

export const postSetOffer = async (requestId, price) => {
  return Axios.post("/provider/setoffer", { requestId, price });
}

export const postSendMessage = async (requestId, body) => {
  return Axios.post("/provider/sendmessage", { requestId, body })
}

export const postReadNotification = async notificationId => {
  return Axios.post("/provider/readnotification", {notificationId});
}
