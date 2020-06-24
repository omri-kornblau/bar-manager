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
    // setCheckbox,
  } = props;

  const [checkboxStatuses,  setCheckbox] = useState(options.reduce((prev, cur) => (
    {[cur]: true, ...prev}
  ), {}));

  return (
    <>
      <StyledMenuItem>
        <StyledTextField label="חיפוש"/>
      </StyledMenuItem>
      {
        options.map(option => (
          <StyledMenuItem
            key={option}
            onClick={() => setCheckbox({
              ...checkboxStatuses,
              [option]: !checkboxStatuses[option],
            })}>
            <StyledCheckbox
              checked={checkboxStatuses[option]}
              label={option}
            />
          </StyledMenuItem>
        ))
      }
    </>
  );
}

const NumberMenuItems = () => {
  return (
    <>
      <StyledMenuItem>
        <StyledTextField label="גדול מ" type="number"/>
      </StyledMenuItem>
      <StyledMenuItem>
        <StyledTextField label="קטן מ" type="number"/>
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
    filterData,
  } = props;

  switch (filterType) {
    case "text": {
      return <TextMenuItems options={filterData}/>;
    }
    case "number": {
      return <NumberMenuItems/>;
    }
    case "options": {
      return <OptionsMenuItems options={filterData}/>;
    }
    default: {
      return <TextMenuItems options={filterData}/>;
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
          <Typography noWrap={true}>
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
            <MenuItems filterType={column.filter.type} filterData={column.filter.data}/>
          </StyledMenu>
        : <></>
      }
    </>
  );
});

TableHeaderCell.propTypes = propTypes;
TableHeaderCell.defaultProps = defaultProps;

export default TableHeaderCell;
