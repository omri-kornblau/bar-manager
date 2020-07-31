import _ from "lodash";
import React, { useCallback } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";

import FormBody from "../../../components/Form/FormBody";
import {
  updateAccountDetaild as structure
} from "../../../constants/structure/settings"
import { useState } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../../redux/selectors/user";
import { useEffect } from "react";
import { getUpdateUserDetailesErrors } from "../../../redux/selectors/errors";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";
import { parseFormError } from "../../../helpers/errors";
import { updateUserDetails } from "../../../redux/thunks/settings";

const MyProfile = props => {
  const {
    userData,
    status,
    updateUserDetails,
  } = props;

  const [form, setForm] = useState(userData);
  useEffect(() => {
    setForm(userData)
  }, [userData])

  const [isDiff, setIsDiff] = useState(true);
  useEffect(() => {
    if (status.try && !status.inProgress) {
      setIsDiff(!_.isNil(status.error));
    }
  }, [status])

  const onChange = useCallback(e => {
    const {
      name,
      value,
    } = e.target;

    setIsDiff(true);
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  const onUpdateDetails = useCallback(e => {
    e.preventDefault();
    updateUserDetails(
      userData.type === "client",
      form);
  }, [form]);

  const label = isDiff
    ? "עדכן"
    : "הפרטים עודכנו";

  return (
    <Container>
      <Typography align="center" variant="h5">
        עדכן פרטי חשבון
      </Typography>
      <form onSubmit={onUpdateDetails}>
        <FormBody
          formStructure={structure}
          spacing={3}
          margin="dense"
          values={form}
          onChange={onChange}
          error={parseFormError(status.error)}
        />
        <Box mt={7}/>
        <Grid justify="center" container>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={status.inProgress}
          >
            {label}
          </LoadingButton>
        </Grid>
      </form>
    </Container>
  );
}

const mapStateToProps = state => ({
  userData: getUserData(state),
  status: getUpdateUserDetailesErrors(state),
})

const mapDispatchToProps = dispatch => ({
  updateUserDetails: updateUserDetails(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
