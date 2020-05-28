import { SET_STEP } from "../actions/newRequest";

const initialState = {
  step: 0
};

const navbarReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload.step
      }

    default:
      return state;
  }
}

export default navbarReducer;
