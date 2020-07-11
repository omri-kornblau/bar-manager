export const TRY_SIGNUP = "TRY_SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const trySignup = () => ({
  type: TRY_SIGNUP,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = err => ({
  type: SIGNUP_FAILURE,
  payload: { err },
});
