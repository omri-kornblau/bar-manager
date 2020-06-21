import { 
  GET_CLIENT,
  GET_CLIENT_FINISH,
 } from "../actions/main";

const initialState = {};

const mainReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CLIENT:
      return {...state, loading: true};

    case GET_CLIENT_FINISH:
      return {...state, loading: false, client: action.payload};

    default:
      return state;
  }
}

export default mainReducer;
