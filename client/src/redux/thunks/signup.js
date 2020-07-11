import { push } from "connected-react-router";

import {
  trySignup,
  signupSuccess,
  signupFailure, 
} from "../actions/signup";
import {
  postSignup as clientPostSignup,
} from "../../api/client";
import {
  postSignup as providerPostSignup,
} from "../../api/provider";

export const signup = outerDispatch => (isClient, data) =>
  outerDispatch(dispatch => {
    dispatch(trySignup())

    const signupFunc = isClient ? clientPostSignup : providerPostSignup;
    signupFunc(data)
      .then(res => {
        dispatch(signupSuccess());
        dispatch(push("/home/login"));
      })
      .catch(err => {
        dispatch(signupFailure(err))
      });
  })
