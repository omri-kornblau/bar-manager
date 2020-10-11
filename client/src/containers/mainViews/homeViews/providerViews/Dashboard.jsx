import _ from "lodash";
import React, {
  useMemo,
  useCallback,
} from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  Paper,
  Container,
} from "@material-ui/core";

import {
  push,
} from "connected-react-router";

import CustomTable from "../../../../components/Table/Table";
import skylineBack from "../../../../assets/img/skyline-back.png";
import useStyles from "./style";
import {
  providerProgressBar as progressBar,
  tableHeaders as requestTableHeaders,
} from "../../../../constants/structure/request";
import {
  chosenHeaders as notificationsChosenHeaders,
  tableHeaders as notificationsTableHeaders,
} from "../../../../constants/structure/notification";
import { getTableHeaders } from "../../../../helpers/structer";
import { connect } from "react-redux";
import { getRequests } from "../../../../redux/selectors/request";
import { getNotifications } from "../../../../redux/selectors/notification";
import { readNotification } from "../../../../redux/thunks/provider";
import { getUserFullName, getUserLastLogin } from "../../../../redux/selectors/user";

const DashboardTable = props => {
  const {
    rows,
    title,
    tooltip,
    chosenHeaders,
    tableHeaders,
    emtpyMessage,
    onRowClick,
  } = props;

  const classes = useStyles();

  return (
    <>
      <Tooltip arrow title={tooltip}>
        <Typography variant="h6" color="inherit" align="center">
          {title}
        </Typography>
      </Tooltip>
      {
        rows.length > 0
        ? <CustomTable
            rows={rows}
            columns={getTableHeaders(
              chosenHeaders,
              false,
              tableHeaders
            )}
            pagination={false}
            onRowClick={onRowClick}
          />
        : <Paper>
            <Typography variant="h6" color="inherit" align="center">
              {emtpyMessage}
            </Typography>
          </Paper>
      }
    </>
  )
}

const ClientDashboardMainView = props => {
  const classes = useStyles();
  const {
    requests,
    notifications,
    pushUrl,
    readNotification,
    userFullName,
    userLastLogin,
  } = props;

  const sepratedRequests = useMemo(() => {
    return requests
      .reduce((pre, request) => ({
        ...pre,
        [request.status]: pre[request.status]
          ? [...pre[request.status], request]
          : [request]
     }), {
       inTenderProcedure: [],
       active: [],
      })
    }, [requests]);

  const formatedNotifications = useMemo(() => {
    return notifications
      .map(notification => ({
        ...notification,
        requestId: notification.request.index,
        requestType: notification.request.type,
      }))
  }, [notifications]);

  const onOpenRequest = useCallback(requestData => {
    pushUrl(`/home/${requestData.type}/${requestData.status}?or=${requestData._id}`);
  })

  const onOpenNotification = useCallback(notificationData => {
    readNotification(notificationData._id);
    const { type, status, _id } = notificationData.request;
    pushUrl(`/home/${type}/${status}?or=${_id}`);
  })

  return (
    <>
      <Grid container alignItems="flex-end">
        <Typography variant="h4" color="inherit">
          <Box fontWeight="fontWeightBold" marginRight={2}>
            שלום {userFullName}
          </Box>
        </Typography>
        <Typography variant="h6" color="inherit">
  התחברותך האחרונה הייתה בתאריך {new Intl.DateTimeFormat('en-GB').format(userLastLogin)} בשעה {userLastLogin.getHours().toString().padStart(2, '0')}:{userLastLogin.getMinutes().toString().padStart(2, '0')}
        </Typography>
      </Grid>
      <Box height={2}/>
      <Container maxWidth="xl">
        <Grid container direction="row" justify="space-evenly" spacing={10}>
          <Grid item xs="6">
            <DashboardTable
              title="עדכונים חדשים"
              tooltip= "עדכונים אשר עדיין לא נקראו"
              rows={formatedNotifications}
              chosenHeaders={notificationsChosenHeaders}
              tableHeaders={notificationsTableHeaders}
              onRowClick={onOpenNotification}
              emtpyMessage="אין עדכונים חדשים"
              xs
            />
          </Grid>
          <Grid item direction="column" xs="6">
            <DashboardTable
              title="פוליסות בהליך מכרזי"
              tooltip= "פוליסות בהליך מכרזי"
              rows={sepratedRequests.inTenderProcedure}
              chosenHeaders={progressBar.inTenderProcedure.chosenHeaders}
              tableHeaders={requestTableHeaders}
              onRowClick={onOpenRequest}
              emtpyMessage="אין פוליסות בהליך מכרזי"
            />
            <Box mt={5}/>
            <DashboardTable
              title="פוליסות פעילות"
              tooltip= "פוליסות שאושרו ונחתמו"
              rows={sepratedRequests.active}
              chosenHeaders={progressBar.active.chosenHeaders}
              tableHeaders={requestTableHeaders}
              onRowClick={onOpenRequest}
              emtpyMessage="אין פוליסות פעילות"
            />
          </Grid>
        </Grid>
      </Container>
      <img style={{
        opacity: "0.15",
        width: "100%",
        height:"50%",
        position: "fixed",
        left:"0",
        bottom: "0",
        zIndex: "-1"
      }} src={skylineBack}></img>
    </>
  );
}

const mapStateToProps = state => ({
  requests: getRequests(state),
  notifications: getNotifications(state),
  userFullName: getUserFullName(state),
  userLastLogin: getUserLastLogin(state),
})

const mapDispatchToProps = dispatch => ({
  pushUrl: _.flow(push, dispatch),
  readNotification: readNotification(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboardMainView);
