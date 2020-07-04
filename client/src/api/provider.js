import Axios from "axios";

export const postFilteredRequests = async (type, filters) => {
  return Axios.post("/provider/filteredrequests", { type, filters })
}

export const getFetchRequest = async requestId => {
  return Axios.get(`/provider/fetchrequest?requestId=${requestId}`);
}

export const postSetOffer = async (requestId, price) => {
  return Axios.post("/provider/setoffer", { requestId, price });
}
