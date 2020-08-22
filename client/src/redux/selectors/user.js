export const getUsername = state => {
  return state.app.user.data.name;
}

export const getUserLoggedIn = state => {
  return state.app.user.isLoggedIn;
}

export const getUserData = state => {
  return {...state.app[getUserType(state)], ...state.app.user.data};
}

export const getUserType = state => {
  return state.app.user.data.type;
}

export const getClientNotificationsSettings = state => {
  return state.app.client.settings.emailNotifications;
}

export const isProvider = state => {
  return getUserType(state) === "provider"
}

export const getUserNotificationsSettings = state => {
  const userType = getUserType(state);
  return userType
    ? state.app[getUserType(state)].settings.emailNotifications
    : {};
}
