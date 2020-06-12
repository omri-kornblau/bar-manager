import React, { useState } from "react";
import {
  Container,
  Button,
  Paper,
  Toolbar,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";

import useStyle from "./style";

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
  const classes = useStyle();

  return (
    <main className={classes.container}>
      <Container className={classes.content} maxWidth="sm">
        <Toolbar/>
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
    </main>
  );
}

export default Signup;
