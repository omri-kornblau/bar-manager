import React, { useState, forwardRef } from "react";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FilterListIcon from '@material-ui/icons/FilterList';

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
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
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
        <TextField label="Search"/> 
      </StyledMenuItem>
      {
        rows.map(row => (
          <StyledMenuItem
            key={row}
            onClick={() => {setCheckbox({
              ...checkboxStatuses,
              [row]: !checkboxStatuses[row],
            })}}>
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
        <TextField label="Bigger Then" type="number"/> 
      </StyledMenuItem>
      <StyledMenuItem>
        <TextField label="Smaller Then" type="number"/> 
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
      onClick={() => {setCheckbox({
        ...checkboxStatuses,
        [option]: !checkboxStatuses[option],
      })}}
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
      return <NumberMenuItems/>;
    }
  }
});

const CustomizedTableHeaderCell = props => {
  const { label, filterType, filterData } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableCell align="right">
        <FilterListIcon onClick={handleClick} style={{float: "right"}}/>
        { label }
      </TableCell>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItems filterType={filterType} filterData={filterData}/>
      </StyledMenu>
    </>
  );
}

export default CustomizedTableHeaderCell;
