import React, { useState } from "react";
import {
  Container,
  Button,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Box,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  FormControl,
  Fab
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";

const SignupTypeSwitch = props => {
  const {
    isClient,
    onChange
  } = props;

  const activeProps = {
    color: "primary",
    variant: "contained"
  }

  const nonActiveProps = {
    color: "default",
    variant: "outlined"
  }

  return (
    <Grid direction="row" container>
      <Grid container justify="center" xs="6">
        <Button onClick={() => onChange(true)} {...(isClient ? activeProps : nonActiveProps)}>
          הירשם כלקוח
        </Button>
      </Grid>
      <Grid container xs="6" justify="center">
        <Button onClick={() => onChange(false)} {...(!isClient ? activeProps : nonActiveProps)}>
          הירשם כחברת ביטוח
        </Button>
      </Grid>
    </Grid>
  );
}

const Signup = props => {
  const [isClient, setIsClient] = useState(true);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} >
        <Box p={4}>
          <Typography align="center" variant="h4">
            הרשמה
          </Typography>
          <Box mt={2}/>
          <Typography align="center" varint="body1">
            סוג המשתמש:
          </Typography>
          <Box mt={1}/>
          <SignupTypeSwitch onChange={setIsClient} isClient={isClient}/>
          <form>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
