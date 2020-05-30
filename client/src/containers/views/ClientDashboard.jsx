import React from "react";
import {
  Grid,
  Typography,
  Box,
} from "@material-ui/core";

import CustomTable from "../../components/Table/Table";

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
    label: "סוג פוליסה"
  },
  {
    id: "price",
    label: "מחיר",
  },
  {
    id: "startTime",
    label: "תאריך התחלה",
  },
  {
    id: "endTime",
    label: "תאריך תפוגה",
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

const ClientDashboard = props => {
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
      <Box height={20}/>
      <Grid container justify="space-evenly" spacing={10} direction="row">
        <Grid item>
          <Typography variant="h6" color="inherit" align="center">
            התראות חדשות
          </Typography>
          <CustomTable  rows={notifications} columns={notificationsColumns} isFilter={true}>
            text
          </CustomTable>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="inherit" align="center">
            פוליסות פעילות
          </Typography>
          <CustomTable  rows={policies} columns={policiesColumns} isRounded={true}/>
        </Grid>
      </Grid>
    </>
  );
}

export default ClientDashboard;
