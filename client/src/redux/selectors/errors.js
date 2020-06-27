export const getLoginErrors = state => {
  return state.app.errors.login
}

export const getCreateRequestErrors = state => {
  return state.app.errors.createRequest
}

export const getUpdateRequestErrors = state => {
  return state.app.errors.updateRequest
}
