export const SET_LOGGED_IN = "SET_LOGGED_IN";

export const setLoggedIn = dispatch => loggedIn => dispatch({
  type: SET_LOGGED_IN,
  payload: { loggedIn }
});
