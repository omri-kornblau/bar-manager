import _ from "lodash";
import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  Box,
  Typography,
} from "@material-ui/core";
import {
  FilterList as FilterListIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import {
  StyledMenu,
  StyledMenuItem,
  StyledTextField,
  StyledCheckbox,
} from "./StyledMUI"
import useStyles from "./style";
import {
  useHover,
  mergeRefs,
} from "./utils"
import {
  SORT_OPTIONS,
} from "./consts";

const TextMenuItems = props => {
  const {
    options,
    setOptions,
  } = props;

  const _setOptions = newOptions => {
    setOptions({
      ...newOptions,
      isActive: newOptions.search !== ""
      || _.some(newOptions.options, value => !value),
    });
  }

  return (
    <>
      <StyledMenuItem>
        <StyledTextField
          label="חיפוש"
          value={options.search}
          onChange={e => {
            e.preventDefault()
            _setOptions({...options, search: e.target.value});
          }}/>
      </StyledMenuItem>
      {
        _.map(options.options, (value, key) => (
          <StyledMenuItem
            key={key}
            onClick={() =>
              _setOptions({
                ...options, 
                options: {
                  ...options.options, 
                  [key]: !value
                }
              })
            }
          >
            <StyledCheckbox
              checked={value}
              label={key}
            />
          </StyledMenuItem>
        ))
      }
    </>
  );
}

const NumberMenuItems = props => {
  const {
    options,
    setOptions
  } = props;

  const onChange = e => {
    const {
      name,
      value,
    } = e.target;

    const tempOptions = {...options, [name]: value};
    setOptions({...tempOptions, isActive: tempOptions.min !== "" || tempOptions.max !== ""});
  }

  return (
    <>
      <StyledMenuItem>
        <StyledTextField
          label="גדול מ"
          type="number"
          name="min"
          value={options.min}
          onChange={onChange}
        />
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledTextField
          label="קטן מ"
          type="number"
          name="max"
          value={options.max}
          onChange={onChange}
        />
      </StyledMenuItem>
    </>
  );
}

const DateMenuItems = props => {
  const {
    options,
    setOptions
  } = props;

  const onBeforeChange = date => {
    setOptions({...options, before: date, isActive: true});
  }

  const onAfterChange = date => {
    setOptions({...options, after: date, isActive: true});
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledMenuItem>
        <KeyboardDatePicker
          disableToolbar
          margin="normal"
          variant="inline"
          label="אחרי"
          format="dd/MM/yyyy"
          name="max"
          value={options.after}
          onChange={onAfterChange}
        />
      <StyledMenuItem>
        <KeyboardDatePicker
          disableToolbar
          margin="normal"
          variant="inline"
          label="לפני"
          format="dd/MM/yyyy"
          name="min"
          value={options.before}
          onChange={onBeforeChange}
        />
      </StyledMenuItem>
      </StyledMenuItem>
    </MuiPickersUtilsProvider>
  );
}

const OptionsMenuItems = props => {
  const {
    options
  } = props;
  const [checkboxStatuses,  setCheckbox] = useState(options.reduce((prev, cur) => (
    {[cur]: true, ...prev}
  ), {}));

  return options.map(option => (
    <StyledMenuItem
      key={option}
      onClick={() => setCheckbox({
        ...checkboxStatuses,
        [option]: !checkboxStatuses[option],
      })}
    >
      <StyledCheckbox
        label={option}
        checked={checkboxStatuses[option]}
      />
    </StyledMenuItem>
  ));
}

const MenuItems = forwardRef((props, ref) => {
  const {
    filterType,
    options,
    setOptions,
  } = props;

  switch (filterType) {
    case "text": {
      return <TextMenuItems options={options} setOptions={setOptions}/>;
    }
    case "number": {
      return <NumberMenuItems options={options} setOptions={setOptions}/>;
    }
    case "options": {
      return <OptionsMenuItems options={options} setOptions={setOptions}/>;
    }
    case "date": {
      return <DateMenuItems options={options} setOptions={setOptions}/>;
    }
    default: {
      return <TextMenuItems options={options} setOptions={setOptions}/>;
    }
  }
});

const propTypes = {
  column: PropTypes.shape({
    label: PropTypes.string,
  }),
  filter: PropTypes.bool,
};

const defaultProps = {
  filter: false,
};

const TableHeaderCell = forwardRef((props, ref) => {
  const {
    column,
    filter,
    options,
    setOptions,
    setSortBy,
    sortDirection,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverRef, isHover] = filter ? useHover() : [null, null];

  const classes = useStyles();

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <TableCell align="left" ref={mergeRefs(ref, hoverRef)}>
        <Box display="flex" alignItems="center">
          <Typography noWrap={true} onClick={setSortBy}>
            {column.label}
          </Typography>
          {
            sortDirection === SORT_OPTIONS.NONE
            ? <></>
            : sortDirection === SORT_OPTIONS.UP
              ? <ArrowDropUpIcon/>
              : <ArrowDropDownIcon/>
          }
          <Box ml={1}/>
          {
            filter && column.filter !== false
            ? <FilterListIcon 
                onClick={onClick} 
                className={classes.filterListIcon} 
                style={{ opacity: (isHover || Boolean(anchorEl)) || options.isActive ? 1 : 0 }}
              />
            : <></>
          }
        </Box>
      </TableCell>
      {
        filter && !_.isNil(column.filter)
        ? <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
          >
            <MenuItems
              filterType={column.filter.type}
              options={options}
              setOptions={setOptions}
            />
          </StyledMenu>
        : <></>
      }
    </>
  );
});

TableHeaderCell.propTypes = propTypes;
TableHeaderCell.defaultProps = defaultProps;

export default TableHeaderCell;
