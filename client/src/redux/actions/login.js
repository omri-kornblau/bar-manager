export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const TRY_LOGIN = "TRY_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const setLoggedIn = dispatch => loggedIn => dispatch({
  type: SET_LOGGED_IN,
  payload: { loggedIn }
});

export const tryLogin = loggedIn => ({
  type: TRY_LOGIN,
  payload: { loggedIn }
});

export const loginSuccess = loggedIn => ({
  type: LOGIN_SUCCESS,
  payload: { loggedIn }
});

export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: { err }
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
