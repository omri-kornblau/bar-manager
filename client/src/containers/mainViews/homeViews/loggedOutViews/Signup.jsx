import _ from "lodash";
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
import FormBody from "../../../../components/Form/FormBody";

import {
  clientForm,
  providerForm,
} from "../../../../constants/structure/signup";
import { parseFormError } from "../../../../helpers/errors";
import { connect } from "react-redux";
import { getSignupErrors } from "../../../../redux/selectors/errors"
import { signup } from "../../../../redux/thunks/signup";
import { useEffect } from "react";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton";

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
  const {
    status,
    signup,
  } = props;

  const classes = useStyle();

  const [isClient, setIsClient] = useState(true);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setError(parseFormError(status.error));
  }, [status]);

  const structure = isClient ? clientForm : providerForm;

  const onChange = e => {
    const {
      name,
      value,
    } = e.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (form.password !== form.rePassword) {
      setError({key: "rePassword", message: "הסיסמאות לא תואמות"});
      return;
    }

    signup(isClient, _.omit(form, ["rePassword"]));
  };

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
            <form onSubmit={onSubmit}>
              <FormBody
                formStructure={structure}
                spacing={3}
                onChange={onChange}
                margin="dense"
                error={error}
                values={form}
              />
              <Box mt={7}/>
              <Grid justify="center" container>
                <LoadingButton
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  loading={status.inProgress}
                >
                  הירשם
                </LoadingButton>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}

const mapStateToProps = state => ({
  status: getSignupErrors(state)
})

const mapDispatchToProps = dispatch => ({
  signup: signup(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
