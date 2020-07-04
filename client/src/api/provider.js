import Axios from "axios";

export const postFilteredRequests = async (type, filters) => {
  return Axios.post("/provider/filteredrequests", { type, filters, skip, limit })
}

export const getFetchRequest = async requestId => {
  return Axios.get(`/provider/fetchrequest?requestId=${requestId}`);
}

export const postSetOffer = async (requestId, price) => {
  return Axios.post("/provider/setoffer", { requestId, price });
}

export const postSendMessage = async (requestId, body) => {
  return Axios.post("/provider/sendmessage", { requestId, body })
}
