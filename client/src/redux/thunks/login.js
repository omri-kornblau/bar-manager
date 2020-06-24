import { push } from "connected-react-router";

import {
  tryLogin,
  loginSuccess,
  loginFailure,
  logoutSuccess
} from "../actions/login";
import {
  postLogin,
  getCheckToken,
  getLogout,
} from "../../api/authentication";

export const login = outerDispatch => (username, password) =>
  outerDispatch(dispatch => {
    dispatch(tryLogin())

    postLogin(username, password)
      .then(res => {
        dispatch(loginSuccess());
        dispatch(push("/home/dashboard/edit"));
      })
      .catch(err => {
        dispatch(loginFailure(err))
      });
  })

export const checkToken = outerDispatch => () =>
  outerDispatch(dispatch => {
    getCheckToken()
      .then(res => {
        dispatch(loginSuccess());
      });
  })

export const logout = outerDispatch => () =>
  outerDispatch(dispatch => {
    getLogout()
      .then(res => {
        dispatch(logoutSuccess());
        dispatch(push("/home/welcome"));
      });
  })
