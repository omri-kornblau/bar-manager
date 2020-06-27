import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress
} from "@material-ui/core";

import useStyle from "./style";

const propTypes = {
  loading: PropTypes.string
}

const LoadingButton = props => {
  const {
    loading,
    children
  } = props;

  const classes = useStyle();

  return (
    <div className={classes.wrapper}>
      <Button
        {...props}
        disabled={loading}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

LoadingButton.propTypes = propTypes;

export default LoadingButton;
