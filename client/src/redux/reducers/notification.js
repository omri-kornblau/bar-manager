import {
  READ_NOTIFICATION,
} from "../actions/notification";
import {
  GET_CLIENT_SUCCESS,
} from "../actions/request";
import {
  GET_PROVIDER_SUCCESS,
} from "../actions/provider";

const initialState = [];

const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CLIENT_SUCCESS:
      return action.payload.notifications;
    case GET_PROVIDER_SUCCESS:
      return action.payload.notifications;
    case READ_NOTIFICATION:
      return state.filter(notification =>
        notification._id !== action.payload.notificationId
      )
    default:
      return state;
  }
}

export default notificationReducer;
