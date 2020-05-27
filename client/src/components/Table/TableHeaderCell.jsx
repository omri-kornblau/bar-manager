import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Menu,
  MenuItem,
  ListItemText,
  TableCell,
  TextField,
  Checkbox,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: 'black',
    minWidth: '150px',
  },
}))(MenuItem);

const TextMenuItems = props => {
  const { rows } = props;
  const [checkboxStatuses,  setCheckbox] = useState(rows.reduce((prev, cur) => (
    {[cur]: true, ...prev}
  ), {}));

  return (
    <>
      <StyledMenuItem>
        <TextField size="small" label="חיפוש"/> 
      </StyledMenuItem>
      {
        rows.map(row => (
          <StyledMenuItem
            key={row}
            onClick={() => setCheckbox({
              ...checkboxStatuses,
              [row]: !checkboxStatuses[row],
            })}>
            <ListItemText align="right" primary={row}/>
            <Checkbox
                checked={checkboxStatuses[row]}
                color="primary"
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
        <TextField label="גדול מ" type="number"/> 
      </StyledMenuItem>
      <StyledMenuItem>
        <TextField label="קטן מ" type="number"/> 
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
      <ListItemText align="right" primary={option}/>
      <Checkbox
          checked={checkboxStatuses[option]}
          color="primary"
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
          ?  <FilterListIcon onClick={onClick} style={{float: "left"}}/>
          : <></>
        }
      </TableCell>
      {
        isFilter
        ?  <StyledMenu
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

export default TableHeaderCell;
