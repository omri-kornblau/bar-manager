export const TRY_CHANGE_PASSWORD = "TRY_CHANGE_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const tryChangePassword = () => ({
  type: TRY_CHANGE_PASSWORD,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = err => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: { err },
});
