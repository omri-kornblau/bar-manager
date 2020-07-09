import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Fab
} from "@material-ui/core";

import useStyle from "./style";

const propTypes = {
  loading: PropTypes.string,
  fab: PropTypes.bool
}

const ButtonComponent = props => {
  return props.fab ?
  <Fab {...props}/>
  : <Button {...props}/>;
}

const LoadingButton = props => {
  const {
    loading,
    children,
  } = props;

  const classes = useStyle();

  return (
    <div className={classes.wrapper}>
      <ButtonComponent
        {...props}
        disabled={loading}
      >
        {children}
      </ButtonComponent>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

LoadingButton.propTypes = propTypes;

export default LoadingButton;
