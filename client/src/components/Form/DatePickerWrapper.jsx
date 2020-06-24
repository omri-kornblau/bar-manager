import React, { useState } from "react";
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
    format,
    onChange,
    name,
  } = props;
  
  const [date, setDate] = useState(new Date());
  const _onChange =  date => {
    setDate(date);
    return onChange({target: {value: date, name: name}});
  }

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
      onChange={_onChange}
      value={date}
    />
  </MuiPickersUtilsProvider>
}

DatePickerWrapper.propTypes = propTypes;
DatePickerWrapper.defaultProps = defaultProps;

export default DatePickerWrapper;
