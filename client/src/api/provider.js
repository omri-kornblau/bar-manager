import Axios from "axios";

export const postFilteredRequests = async (type, filters) => {
  return Axios.post("/provider/filteredrequests", { type, filters })
}
