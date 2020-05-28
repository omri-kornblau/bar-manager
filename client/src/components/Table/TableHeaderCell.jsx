import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  StyledMenu,
  StyledMenuItem,
  StyledTextField,
  StyledCheckbox,
} from "./styled"

const TextMenuItems = props => {
  const { rows } = props;
  const [checkboxStatuses,  setCheckbox] = useState(rows.reduce((prev, cur) => (
    {[cur]: true, ...prev}
  ), {}));

  return (
    <>
      <StyledMenuItem>
        <StyledTextField label="חיפוש"/>
      </StyledMenuItem>
      {
        rows.map(row => (
          <StyledMenuItem
            key={row}
            onClick={() => setCheckbox({
              ...checkboxStatuses,
              [row]: !checkboxStatuses[row],
            })}>
            <StyledCheckbox
              checked={checkboxStatuses[row]}
              label={row}
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
  const { options } = props;
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
  const { filterType, filterData } = props;

  switch (filterType) {
    case "text": {
      return <TextMenuItems rows={filterData}/>;
    }
    case "number": {
      return <NumberMenuItems/>;
    }
    case "options": {
      return <OptionsMenuItems options={filterData}/>;
    }
    default: {
      return <TextMenuItems rows={filterData}/>;
    }
  }
});

const propTypes = {
  column: PropTypes.objectOf({
    label: PropTypes.string,
  }),
  isFilter: PropTypes.bool,
};

const defaultProps = {
  isFilter: false,
};

const TableHeaderCell = props => {
  const { column, isFilter } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableCell align="left">
        { column.label }
        {
          isFilter
          ? <FilterListIcon onClick={onClick} style={{float: "left"}}/>
          : <></>
        }
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
}

TableHeaderCell.propTypes = propTypes;
TableHeaderCell.defaultProps = defaultProps;

export default TableHeaderCell;
