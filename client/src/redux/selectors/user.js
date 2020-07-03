export const getUsername = state => {
  return state.app.user.data.name;
}

export const getUserLoggedIn = state => {
  return state.app.user.isLoggedIn;
}

export const getUserData = state => {
  return state.app.user.data;
}
