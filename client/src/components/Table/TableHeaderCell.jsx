import React, { useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

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
    width: '150px',
  },
}))(MenuItem);

const CustomizedTableHeaderCell = props => {
  const { label } = props
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableCell align="right" onClick={handleClick}>
        { label }
      </TableCell>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <TextField label="Search"/> 
        </StyledMenuItem>
        <StyledMenuItem>
          <TextField label="Bigger Then" type="number"/> 
        </StyledMenuItem>
        <StyledMenuItem>
          <TextField label="Smaller Then" type="number"/> 
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText align="right" primary="text" color="primary"/>
          <Checkbox
              checked={true}
              color="primary"
            />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

export default CustomizedTableHeaderCell;
