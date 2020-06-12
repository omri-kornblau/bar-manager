import React from "react";
import {
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

const LoginTooltip = props => {
  return (
    <Link to="/home/login">
      <Button size="large">
        התחבר
      </Button>
    </Link>
  );
}

export default LoginTooltip;
