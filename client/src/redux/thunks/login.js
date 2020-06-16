import { LOCATION_CHANGE } from "connected-react-router";

import {
  tryLogin,
  loginSuccess,
  loginFailure
} from "../actions/login";
import {
  postLogin,
  getCheckToken
} from "../../api/authentication";

export const login = outerDispatch => (username, password) =>
  outerDispatch(dispatch => {
    dispatch(tryLogin())

    postLogin(username, password)
      .then(res => {
        dispatch(loginSuccess())
        dispatch({
          type: LOCATION_CHANGE,
          payload: {
            location: {
              pathname: "/home/dashboard/edit",
            },
            action: "PUSH"
          },
        })
      })
      .catch(err => {
        dispatch(loginFailure(err))
      });
  })

export const checkToken = outerDispatch => () =>
  outerDispatch(dispatch => {
    getCheckToken()
      .then(res => {
        dispatch(loginSuccess())
      })
  })
