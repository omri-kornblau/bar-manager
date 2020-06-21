import Axios from "axios";

export const getClient = async () => {
  return Axios.get("/client/get");
}
