import Login from "./loggedOutViews/Login";
import Signup from "./loggedOutViews/Signup";
import Welcome from "./loggedOutViews/Welcome";

const LoggedOutViews = {
  welcome: {
    name: "ברוך הבא",
    component: Welcome
  },
  login: {
    name: "התחבר",
    component: Login
  },
  signup: {
    name: "הירשם",
    component: Signup
  }
};

export default LoggedOutViews
