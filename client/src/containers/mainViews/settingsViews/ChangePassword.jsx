import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Box
} from "@material-ui/core";

import FormBody from "../../../components/Form/FormBody";
import {
  changePassword as structure,  
} from "../../../constants/structure/settings"
import { connect } from "react-redux";
import { getChangePasswordErrors } from "../../../redux/selectors/errors";
import { changePassword } from "../../../redux/thunks/settings";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";
import { parseFormError } from "../../../helpers/errors";

const ChangePassword = props => {
  const {
    status,
    changePassword,
  } = props;

  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  useEffect(() => {
    setError(parseFormError(status.error));
  }, [status]);

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

  const onChangePassword = useCallback(e => {
    e.preventDefault();
    if (form.newPassword !== form.reNewPassword) {
      setError({key: "reNewPassword", message: "הסיסמאות לא תואמות"});
      return;
    }

    changePassword(form.previosPassword, form.newPassword)
  }, [form]);

  const label = isDiff
    ? "עדכן סיסמה"
    : "הסיסמה עודכנה";

  return (
    <Container>
      <Typography align="center" variant="h5">
        בחר סיסמה חדשה
      </Typography>
      <form onSubmit={onChangePassword}>
        <FormBody
          formStructure={structure}
          spacing={3}
          margin="dense"
          error={error}
          onChange={onChange}
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
  status: getChangePasswordErrors(state)
})

const mapDispatchToProps = dispatch => ({
  changePassword: changePassword(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
