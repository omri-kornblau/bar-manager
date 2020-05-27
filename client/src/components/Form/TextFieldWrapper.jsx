import React from "react";
import PropTypes from "prop-types";
import {
  TextField
} from "@material-ui/core";

const propTypes = {
  fullWidth: PropTypes.bool
}

const defaultProps = {
  fullWidth: true
}

const TextFieldWrapper = props => {
  return <TextField {...props}/>
}

TextFieldWrapper.propTypes = propTypes;
TextFieldWrapper.defaultProps = defaultProps;

export default TextFieldWrapper;
