import React from "react";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
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

const NotificationSettings = props => {
  const {
    settings,
    userType,
  } = props;

  const structure = userType === "client"
    ? clientNotificationsTypes
    : providerNotificationsTypes;

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
                    checked={settings[notificationsTypes[notificationType].name]}
                  />
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Container>
  );
}

const mapStateToProps = state => ({
  settings: getUserNotificationsSettings(state),
  userType: getUserType(state),
})

const mapDispatchToProps = dispatch => ({
  // updateUserDetails: updateUserDetails(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
