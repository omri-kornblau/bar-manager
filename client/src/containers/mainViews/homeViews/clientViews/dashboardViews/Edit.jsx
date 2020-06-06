import React from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip
} from "@material-ui/core";

import CustomTable from "../../../../../components/Table/Table";
import skylineBack from "../../../../../assets/img/skyline-back.png";

const notificationsColumns = [
  {
    id: "message",
    label: "הודעה",
    filter: {
      type: "text"
    }
  },
  {
    id: "time",
    label: "זמן",
    filter: {
      type: "text"
    }
  },
  {
    id: "policy",
    label: "פוליסה",
    filter: {
      type: "text"
    }
  }
];

const createNotification = (message, time, policy) => ({message, time, policy});

const notifications = [
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
  createNotification("התקבלה הצעה חדשה", "20:00", "ביטוח רכב"),
];

const policiesColumns = [
  {
    id: "type",
    label: "סוג פוליסה",
    filter: {
      type: "text"
    }
  },
  {
    id: "price",
    label: "מחיר",
    filter: {
      type: "text"
    }
  },
  {
    id: "startTime",
    label: "תאריך התחלה",
    filter: {
      type: "text"
    }
  },
  {
    id: "endTime",
    label: "תאריך תפוגה",
    filter: {
      type: "text"
    }
  },
]

const createPolicies = (type, price, startTime, endTime) => ({type, price, startTime, endTime});

const policies = [
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
  createPolicies("רכב", "3000", "10-03-2018", "09-03-2012"),
]

const ClientDashboardMainView = props => {
  return (
    <>
      <Grid container alignItems="flex-end">
        <Typography variant="h4" color="inherit">
          <Box fontWeight="fontWeightBold" marginRight={2}>
            שלום משתמש 1
          </Box>
        </Typography>
        <Typography variant="h6" color="inherit">
          ביקורך האחרון היה בתאריך 13/05/2020 בשעה 18:26
        </Typography>
      </Grid>
      <Box height={2}/>
      <Grid container justify="space-evenly" direction="row">
        <Grid item>
          <Tooltip arrow title="התראות אשר עדיין לא נקראו">
            <Typography variant="h6" color="inherit" align="center">
              התראות חדשות
            </Typography>
          </Tooltip>
          <CustomTable  rows={notifications} columns={notificationsColumns}>
            text
          </CustomTable>
        </Grid>
        <Grid item>
          <Tooltip arrow title="פוליסות שאושרו ונחתמו">
            <Typography variant="h6" color="inherit" align="center">
              פוליסות פעילות
            </Typography>
          </Tooltip>
          <CustomTable rows={policies} columns={policiesColumns} isRounded={true} isFilter={true}/>
        </Grid>
      </Grid>
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

export default ClientDashboardMainView;
