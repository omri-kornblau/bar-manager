import _ from "lodash";
import React, { useState , useEffect, useCallback} from "react";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Box,
} from "@material-ui/core";

import {
  notificationsTypes,
  clientNotificationsTypes,
  providerNotificationsTypes,
} from "../../../constants/structure/settings";
import {
  getUserNotificationsSettings,
  getUserType,
} from "../../../redux/selectors/user";
import { connect } from "react-redux";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";
import { updateUserNotificationSettings } from "../../../redux/thunks/settings";
import { getUpdateNotificationSettingsErrors } from "../../../redux/selectors/errors";

const NotificationSettings = props => {
  const {
    notificationSettings,
    userType,
    updateNotificationSettings,
    status,
  } = props;

  const [form, setForm] = useState(notificationSettings);
  const [isDiff, setIsDiff] = useState(true);
  useEffect(() => {
    if (status.try && !status.inProgress) {
      setIsDiff(!_.isNil(status.error));
    }
  }, [status])

  const onChange = async e => {
    const { name } = e.target;
    setIsDiff(true);
    setForm({...form, [name]: !form[name]});
  }

  const structure = userType === "client"
    ? clientNotificationsTypes
    : providerNotificationsTypes;

  const label = isDiff
    ? "עדכן"
    : "הפרטים עודכנו";

  const onSubmit = useCallback(() => {
    updateNotificationSettings(
      userType === "client",
      form);
  }, [form]);

  return (
    <Container>
      <Typography align="center" variant="h5">
        הגדר התראות
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              סוג אירוע
            </TableCell>
            <TableCell>
              קבלה למייל
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            structure.map(notificationType => 
              <TableRow>
                <TableCell>
                  {notificationsTypes[notificationType].label}
                </TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    name={notificationsTypes[notificationType].name}
                    checked={form[notificationsTypes[notificationType].name]}
                    onChange={onChange}
                  />
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <Box mt={2}/>
      <Grid justify="center" container>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onSubmit}
          loading={status.inProgress}
        >
          {label}
        </LoadingButton>
      </Grid>
    </Container>
  );
}

const mapStateToProps = state => ({
  notificationSettings: getUserNotificationsSettings(state),
  userType: getUserType(state),
  status: getUpdateNotificationSettingsErrors(state),
})

const mapDispatchToProps = dispatch => ({
  updateNotificationSettings: updateUserNotificationSettings(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
