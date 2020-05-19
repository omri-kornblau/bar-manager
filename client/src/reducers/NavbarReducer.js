import { SET_PAGE } from "../actions/NavbarActions";

const initialNavbar = {
  page: "entry"
};

const NavbarReducer = (state=initialNavbar, action) => {
  switch(action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      };

    default:
      return state;
  }
}

export default NavbarReducer;
