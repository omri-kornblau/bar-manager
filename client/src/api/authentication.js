import Axios from "axios";

export const postLogin = async (username, password) => {
  return Axios.post("/auth/authenticate", {
    username,
    password
  });
}

export const getCheckToken = async () => {
  return Axios.get("/auth/checktoken");
}

export const getLogout = async () => {
  return Axios.get("/auth/logout");
}
