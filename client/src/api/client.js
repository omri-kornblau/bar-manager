import Axios from "axios";

export const getClient = async () => {
  return Axios.get("/client/get");
}

export const newRequest = async request => {
  return Axios.post("/client/newrequest", request)
} 
