import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemText,
  TextField,
  Checkbox,
} from "@material-ui/core";
import useStyles from "./style";

const StyledMenu = props => {
  const classes = useStyles();

  return (
    <Menu
      classes={{paper: classes.menuPaper}}
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
  );
}

const StyledMenuItem = props => {
  const classes = useStyles();

  return (
    <MenuItem classes={{root: classes.menuItem}} {...props}/>
  )
}

const StyledTextField = props => {
  const [isFocues, setFocus] = useState(false);
  const [inputText, setText] = useState("");

  const classes = useStyles();

  return (
    <TextField label="חיפוש"
      fullWidth
      {...props}
      inputProps={{
        className: classes.input,
      }}
      InputProps={{
        classes:{
          underline: classes.underline
        }
      }}
      InputLabelProps={{
        style: {
          transform: (isFocues || inputText.length > 0) ? "translate(0, 0px) scale(0.75)" : "translate(0, 10px) scale(1)"
        }
      }}
      onChange={(e) => setText(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    /> 
  )
}

const StyledListItemText = props => {
  const classes = useStyles();

  return (
    <ListItemText
      {...props}
      classes={{
        primary: classes.itemText
      }}
    />
  );
}

const StyledCheckbox = props => {
  const {
    checked,
    label
  } = props;

  const classes = useStyles();

  return (
    <>
      <StyledListItemText align="right" primary={label}/>
      <Checkbox
        checked={checked}
        color="primary"
        classes={{
          root: classes.checkbox
        }}
      />
    </>
  )
}

export {
  StyledMenu,
  StyledMenuItem,
  StyledTextField,
  StyledListItemText,
  StyledCheckbox
}
