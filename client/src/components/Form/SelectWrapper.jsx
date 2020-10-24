import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useState } from "react";

const propTypes = {
  fullWidth: PropTypes.bool,
  defaultValue: PropTypes.string,
}

const defaultProps = {
  fullWidth: true,
  defaultValue: "",
}
const SelectWrapper = props => {
  const {
    options,
    label,
    fullWidth,
    defaultValue,
    onChange,
    value,
  } = props;

  const [_value, setValue] = useState(value ? value : defaultValue);
  
  const _onChange = e => {
    const { value } = e.target;
    setValue(value);
    onChange(e);
  }

  return (
    <FormControl style={{minWidth: 120}} fullWidth={fullWidth}>
      <InputLabel shrink>
        { label }
      </InputLabel>
      <Select {...props} displayEmpty value={_value} onChange={_onChange}>
        {
          options.map(option => 
            option.type === "default"
            ? <MenuItem value={option.value}>
                <em>
                  {option.label}
                </em>
              </MenuItem>
            : <MenuItem value={option.value}>{option.label}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
}

SelectWrapper.propTypes = propTypes;
SelectWrapper.defaultProps = defaultProps;

export default SelectWrapper;
