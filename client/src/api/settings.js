import Axios from "axios";

export const postChangePassword = async (previosPassword, newPassword) => {
  return Axios.post("/auth/changepassword", {previosPassword, newPassword});
}

export const postUpdateClientDetailes = async data => {
  return Axios.post("/client/updatedetailes", data);
}

export const postUpdateProviderDetailes = async data => {
  return Axios.post("/provider/updatedetailes", data);
}
