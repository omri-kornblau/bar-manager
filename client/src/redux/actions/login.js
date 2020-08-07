export const TRY_LOGIN = "TRY_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const TRY_CHECKTOKEN = "TRY_CHECKTOKEN";
export const CHECKTOKEN_SUCCESS = "CHECKTOKEN_SUCCESS";
export const CHECKTOKEN_FAILURE= "CHECKTOKEN_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const tryLogin = () => ({
  type: TRY_LOGIN
});

export const loginSuccess = userData => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: { err }
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const tryCheckToken = () => ({
  type: TRY_CHECKTOKEN
});

export const checkTokenSuccess = userData => ({
  type: CHECKTOKEN_SUCCESS,
  payload: userData
})

export const checkTokenFailure = err => ({
  type: CHECKTOKEN_FAILURE,
  payload: { err }
})
