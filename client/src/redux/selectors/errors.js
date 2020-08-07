export const getErrors = state => {
  return state.app.errors
}

export const getChangePasswordErrors = state => {
  return state.app.errors.changePassword;
}

export const getUpdateUserDetailesErrors = state => {
  return state.app.errors.updateUserDetailes;
}

export const getSignupErrors = state => {
  return state.app.errors.signup;
}

export const getLoginErrors = state => {
  return state.app.errors.login;
}

export const getCreateRequestErrors = state => {
  return state.app.errors.createRequest;
}

export const getUpdateRequestErrors = state => {
  return state.app.errors.updateRequest;
}

export const getFetchedRequestErrors = state => {
  return state.app.errors.fetchRequest.inProgress;
}

export const getSetOfferErrors = state => {
  return state.app.errors.setOffer;
}

export const getSendMessageErrors = state => {
  return state.app.errors.sendMessage;
}

export const getSendMessageErrorsClient = state => {
  return state.app.errors.sendMessageClient;
}

export const getCheckTokenErrors = state => {
  return state.app.errors.checkToken;
}

