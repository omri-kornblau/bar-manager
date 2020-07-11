import Axios from "axios";

export const postChangePassword = async (previosPassword, newPassword) => {
  return Axios.post("/auth/changepassword", {previosPassword, newPassword});
}
