import _ from "lodash";
import React from "react";
import {
  Typography,
  Grid,
  Box,
  Fab,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

import CustomTable from "../../components/Table/Table";

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

const PolicyExtraInfo = props => {
  const {
    row,
  } = props;
  console.log(row);

  return _.map(row, (value, key) => 
    <h5>{key} - {value}</h5>
  );
}

const ClientActiveRequests = props => {
  return (
    <>
      <Grid container justify="space-between">
        <Typography variant="h4" color="inherit" align="center">
          בקשות פעילות
        </Typography>
        <Link to="newrequest">
          <Fab color="primary" size="small">
            <AddIcon/>
          </Fab>
        </Link>
      </Grid>
      <Box marginBottom={2}/>
      <CustomTable
        rows={policies}
        columns={policiesColumns}
        isRounded
        isFilter
        collapse={<PolicyExtraInfo/>}
      />
    </>
  );
}

export default ClientActiveRequests;
