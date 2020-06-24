import _ from "lodash";
import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

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

const TextMenuItems = props => {
  const {
    options,
    setOptions,
  } = props;

  return (
    <>
      <StyledMenuItem>
        <StyledTextField
          label="חיפוש"
          value={options.search}
          onChange={e => {
            setOptions({...options, search: e.target.value})
          }}/>
      </StyledMenuItem>
      {
        _.map(options.options, (value, key) => (
          <StyledMenuItem
            key={key}
            onClick={() => setOptions({
              ...options, 
              options: {
                ...options.options, 
                [key]: !value
              }
            })}
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

    setOptions({...options, [name]: value});
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
    default: {
      return <TextMenuItems options={options} setOptions={setOptions}/>;
    }
  }
});

const propTypes = {
  column: PropTypes.shape({
    label: PropTypes.string,
  }),
  isFilter: PropTypes.bool,
};

const defaultProps = {
  isFilter: false,
};

const TableHeaderCell = forwardRef((props, ref) => {
  const {
    column,
    isFilter,
    options,
    setOptions,
    setSortBy,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverRef, isHover] = isFilter ? useHover() : [null, null];

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
          <Box ml={1}/>
          {
            isFilter
            ? <FilterListIcon 
                onClick={onClick} 
                className={classes.filterListIcon} 
                style={{ opacity: (isHover || Boolean(anchorEl)) ? 1 : 0 }}
              />
            : <></>
          }
        </Box>
      </TableCell>
      {
        isFilter
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
