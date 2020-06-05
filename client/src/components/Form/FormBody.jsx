import React from "react";
import PropTypes from "prop-types";
import {
  Grid
} from "@material-ui/core";

import DatePickerWrapper from "./DatePickerWrapper";
import TextFieldWrapper from "./TextFieldWrapper";

const Input = props => {
  switch(props.type) {
    case "date":
      return <DatePickerWrapper {...props}/>

    default:
      return <TextFieldWrapper {...props}/>
  }
}

const propTypes = {
  formStructure: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        helperText: PropTypes.string,
        defaultValue: PropTypes.string
      })
    )
  ),
  variant: PropTypes.oneOf(["outlined", "filled", "standart"]),
  spacing: PropTypes.number,
  margin: PropTypes.oneOf(["dense", "none", "normal"]),
  dateFormat: PropTypes.string,
  justify: PropTypes.oneOf(["flex-start", "flex-end", "center"])
}

const defaultProps = {
  formStructure: [[]],
  dateFormat: "MM/dd/yyyy",
  justify: "flex-start"
}

const FormBody = props => {
  const {
    formStructure,
    variant,
    spacing,
    margin,
    dateFormat,
    justify
  } = props;

  return (
    formStructure.map((row, idx) =>
      <Grid key={idx} container spacing={spacing} direction="row">
        {row.map(field =>
          <Grid key={field.label} xs item container justify={field.justify || justify}>
            <Input
              variant={field.variant || variant}
              margin={margin}
              format={dateFormat}
              type={field.type}
              label={field.label}
              defaultValue={field.defaultValue}
              helperText={field.helperText}
              fullWidth={field.fullWidth}
              required={field.required}
            />
          </Grid>
        )}
      </Grid>
    )
  );
}

FormBody.propTypes = propTypes;
FormBody.defaultProps = defaultProps;

export default FormBody;