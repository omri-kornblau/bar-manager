import _ from "lodash"
import React from "react";
import {
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useState } from "react";

const CheckboxWrapper = props => {
  const {
    onChange,
    name,
    label,
    value
  } = props;

  const [checked, setChecked] = useState(false);

  const onClick = () => {
    onChange({target: {name: name, value: !checked}});
    setChecked(!checked);
  }

  return  (
    <FormControlLabel
      control={
        <Checkbox color="primary" {...props} onChange={e=>{}} onClick={onClick}/>
      }
      name={name}
      checked={value}
      label={label}
      labelPlacement="start"
    />
  );
}

export default CheckboxWrapper;
