export const TRY_UPDATE_NOTIFICATIONS_SETTINGS = "TRY_UPDATE_NOTIFICATIONS_SETTINGS";
export const UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS = "UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS";
export const UPDATE_NOTIFICATIONS_SETTINGS_FAILURE = "UPDATE_NOTIFICATIONS_SETTINGS_FAILURE";

export const TRY_CHANGE_PASSWORD = "TRY_CHANGE_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const TRY_UPDATE_USER_DETAILES = "TRY_UPDATE_USER_DETAILES";
export const UPDATE_USER_DETAILES_SUCCESS = "UPDATE_USER_DETAILES_SUCCESS";
export const UPDATE_USER_DETAILES_FAILURE = "UPDATE_USER_DETAILES_FAILURE";

export const tryUpdateNotificationSettings = () => ({
  type: TRY_UPDATE_NOTIFICATIONS_SETTINGS,
});

export const updateNotificationSettingsSuccess = () => ({
  type: UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
});

export const updateNotificationSettingsFailure = err => ({
  type: UPDATE_NOTIFICATIONS_SETTINGS_FAILURE,
  payload: { err },
});

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

export const tryUpdateUserDetailes = () => ({
  type: TRY_UPDATE_USER_DETAILES,
});

export const updateUserDetailesSuccess = () => ({
  type: UPDATE_USER_DETAILES_SUCCESS,
});

export const updateUserDetailesFailure = err => ({
  type: UPDATE_USER_DETAILES_FAILURE,
  payload: { err },
});
