import { push } from "connected-react-router";

import {
  tryChangePassword,
  changePasswordSuccess,
  changePasswordFailure, 
} from "../actions/settings";
import {
  postChangePassword,
} from "../../api/settings";

export const changePassword = outerDispatch => (previosPassword, newPassword) =>
  outerDispatch(dispatch => {
    dispatch(tryChangePassword())

    postChangePassword(previosPassword, newPassword)
      .then(res => {
        dispatch(changePasswordSuccess());
      })
      .catch(err => {
        dispatch(changePasswordFailure(err))
      });
  })
