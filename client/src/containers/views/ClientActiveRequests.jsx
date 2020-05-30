import _ from "lodash";
import React from "react";
import {
  Typography,
  Box,
} from "@material-ui/core";

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
      <Typography variant="h5" color="inherit" align="center">
        בקשות פעילות
      </Typography>
      <Box height='5px'/>
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
