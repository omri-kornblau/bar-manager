import React from "react";
import PropTypes from "prop-types";
import {
  Typography
} from "@material-ui/core";

const propTypes = {
  error: PropTypes.object,
  defaultText: PropTypes.string
}

const defaultProps = {
  error: {},
  defaultText: "שגיאה"
}

const ErrorMessage = props => {
  const {
    error,
    defaultText
  } = props;

  return (
    <Typography
      color="secondary"
      align="center"
      {...props}
    >
      {!error.key ? error.message : defaultText}
    </Typography>
  )
}

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;

export default ErrorMessage;
