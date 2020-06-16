import React, { useCallback, useState } from "react";
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
import { login as loginThunk } from "../../../../redux/thunks/login";
import { getLoginErrors } from "../../../../redux/selectors/errors";

const Login = props => {
  const {
    login,
    loginStatus
  } = props;

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    })
  });

  const onLogin = useCallback(e => {
    e.preventDefault();
    login(userDetails.username, userDetails.password)
  }
  , [userDetails, login]);


  const classes = useStyle();

  const errorMessage = loginStatus.error ? "שם משתמש או סיסמה לא נכונים" : "";

  return (
    <main className={classes.container}>
      <Container className={classes.content} maxWidth="xs">
        <Toolbar/>
        <Paper elevation={3} >
          <Box p={4}>
            <Typography align="center" variant="h6">
              התחברות
            </Typography>
            <form onSubmit={onLogin}>
              <Grid container direction="column" align="center" justify="center">
                <TextField
                  margin="normal"
                  fullWidth
                  label="אימייל או שם משתמש"
                  name="username"
                  value={userDetails.username}
                  onChange={onChange}
                  error={!!loginStatus.error}
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
                  name="password"
                  value={userDetails.password}
                  onChange={onChange}
                  error={!!loginStatus.error}
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
                        <Checkbox
                          color="primary"
                          name="rememberMe"
                          value={userDetails.rememberMe}
                          onChange={onChange}
                        />
                      }
                      label="זכור אותי במכשיר זה"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Box mr={4} ml={4} mt={3}>
                <Button
                  type="submit"
                  fullWidth={true}
                  color="primary"
                  variant="contained"
                >
                  היכנס
                </Button>
                <Box mt={1}/>
                <Typography color={loginStatus.inProgress ? "" : "secondary"} align="center">
                  {loginStatus.inProgress ? "טוען.." : errorMessage}
                </Typography>
              </Box>
            </form>
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

const mapStateToProps = state => ({
  loginStatus: getLoginErrors(state)
})

const mapDispatchToProps = dispatch => ({
  login: loginThunk(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
