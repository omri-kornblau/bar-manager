import React from "react";
import {
  Container,
  Button,
  InputBase,
  Input,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Box,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

import useStyles from "./style";
import FormBody from "../../components/Form/FormBody";

const structure = [
  [
    {
      label: "אימייל או שם משתמש",
      fullWidth: true
    }
  ],
  [
    {
      label: "סיסמה",
      type: "password",
      fullWidth: true
    }
  ]
]

const Login = props => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar/>
      <Container className={classes.container} maxWidth="xs">
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
                <Typography align="left">
                  <Link href="#" variant="body2">
                    שכחתי סיסמה
                  </Link>
                </Typography>
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
            <Box m={4} mt={3}>
              <Button
                type="submit"
                fullWidth={true}
                color="primary"
                variant="contained"
              >
                היכנס
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}

export default Login;
