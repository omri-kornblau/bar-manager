import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";

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
