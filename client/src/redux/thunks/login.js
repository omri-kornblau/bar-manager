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
import { getClientData } from "./client";

export const login = outerDispatch => (username, password) =>
  outerDispatch(dispatch => {
    dispatch(tryLogin())

    postLogin(username, password)
      .then(res => {
        dispatch(loginSuccess({name: username}));
        dispatch(push("/home/dashboard/edit"));
        getClientData(dispatch)();
      })
      .catch(err => {
        dispatch(loginFailure(err))
      });
  })

export const checkToken = outerDispatch => originUrl =>
  outerDispatch(dispatch => {
    getCheckToken()
      .then(res => {
        dispatch(loginSuccess({name: res.data.username}));
        dispatch(push(originUrl));
      })
      .catch(err => {
        dispatch(logoutSuccess());
        dispatch(push("/home/welcome"));
      })
  })

export const logout = outerDispatch => () =>
  outerDispatch(dispatch => {
    getLogout()
      .then(res => {
        dispatch(logoutSuccess());
        dispatch(push("/home/welcome"));
      });
  })
