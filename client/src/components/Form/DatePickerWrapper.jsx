import React from "react";
import PropTypes from "prop-types";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const propTypes = {
  label: PropTypes.string,
  format: PropTypes.string
}

const defaultProps = {
  format: "MM/dd/yyyy"
}

const DatePickerWrapper = props => {
  const {
    label,
    format
  } = props;

  return <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format={format}
      margin="normal"
      id="date-picker-inline"
      label={label}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  </MuiPickersUtilsProvider>
}

DatePickerWrapper.propTypes = propTypes;
DatePickerWrapper.defaultProps = defaultProps;

export default DatePickerWrapper;
