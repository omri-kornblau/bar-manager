import _ from "lodash";
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
    minDate,
    maxDate,
  } = props;
  
  const currentDate = new Date();
  const [date, setDate] = useState(!_.isNil(minDate) && minDate > currentDate
    ? minDate
    : !_.isNil(maxDate) && maxDate < currentDate
      ? maxDate
      : new Date());

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
      minDate={minDate}
      maxDate={maxDate}
    />
  </MuiPickersUtilsProvider>
}

DatePickerWrapper.propTypes = propTypes;
DatePickerWrapper.defaultProps = defaultProps;

export default DatePickerWrapper;
