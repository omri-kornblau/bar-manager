import React, { useCallback } from "react";
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
  FormControl
} from "@material-ui/core";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";

import useStyle from "./style";
import { setLoggedIn } from "../../../../redux/actions/user";

const Login = props => {
  const {
    setLoggedIn
  } = props;

  const onLogin = useCallback(() => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  const classes = useStyle();

  return (
    <main className={classes.container}>
      <Container className={classes.content} maxWidth="xs">
        <Toolbar/>
        <Paper elevation={3} >
          <Box p={4}>
            <Typography align="center" variant="h6">
              התחברות
            </Typography>
            <form>
              <Grid container direction="column" align="center" justify="center">
                <TextField
                  margin="normal"
                  fullWidth
                  label="אימייל או שם משתמש"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  type="password"
                  fullWidth
                  label="סיסמה"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Box mt={3}>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox color="primary" name="checkedC" />
                      }
                      label="זכור אותי במכשיר זה"
                    />
                  </FormControl>
                </Box>
              </Grid>
            </form>
            <Box mr={4} ml={4} mt={3}>
              <Link to="/home/dashboard">
                <Button
                  type="submit"
                  fullWidth={true}
                  color="primary"
                  variant="contained"
                  onClick={onLogin}
                >
                  היכנס
                </Button>
              </Link>
            </Box>
            <Box mt={6}/>
            <Grid container justify="center" direction="row">
              עוד אין לכם חשבון?
              <Box mr={2}/>
              <Link to="/home/signup">
                <Button size="small" color="primary" variant="contained">
                  הירשמו כאן
                </Button>
              </Link>
            </Grid>
          </Box>
        </Paper>
        <Box mt={3}>
          <Link to="/home/welcome">
            <Button size="large" fullWidth>
              חזרה לדף הבית
              <ExitIcon fontSize="small"/>
            </Button>
          </Link>
        </Box>
      </Container>
    </main>
  );
}

const mapDispatchToProps = dispatch => ({
  setLoggedIn: setLoggedIn(dispatch)
})

export default connect(null, mapDispatchToProps)(Login);
