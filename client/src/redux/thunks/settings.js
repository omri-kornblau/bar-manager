import { push } from "connected-react-router";

import {
  tryChangePassword,
  changePasswordSuccess,
  changePasswordFailure,
  tryUpdateUserDetailes,
  updateUserDetailesSuccess,
  updateUserDetailesFailure, 
} from "../actions/settings";
import {
  postChangePassword,
  postUpdateClientDetailes,
  postUpdateProviderDetailes,
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

export const updateUserDetails = outerDispatch => (isClient, data) =>
  outerDispatch(dispatch => {
    dispatch(tryUpdateUserDetailes())

    const updateFunc = isClient
      ? postUpdateClientDetailes
      : postUpdateProviderDetailes;

    updateFunc(data)
      .then(res => {
        dispatch(updateUserDetailesSuccess());
      })
      .catch(err => {
        dispatch(updateUserDetailesFailure(err))
      });
  })
