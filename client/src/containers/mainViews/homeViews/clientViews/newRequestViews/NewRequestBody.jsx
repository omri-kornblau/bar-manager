import _ from "lodash"
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Menu, Grid, TableContainer, Table, TableBody, TableRow, TableCell
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CheckIcon from "@material-ui/icons/Check";

import FillDetails from "../../../../../components/NewRequestForm/DetailsForm";

import { applyFormat } from "../../../../../helpers/formats";
import { labels } from "../../../../../constants/hebrew/request";
import { modalChosenHeaders } from "../../../../../constants/structure/request";
import newBack from "../../../../../assets/img/new-back.png"

const propTypes = {
  viewLabel: PropTypes.string
};

const DataList = ({ data }) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        { modalChosenHeaders.map(headStruct => {
          const { id, formatter } = headStruct;
          const value = data[id];

          if (_.isNil(value)) {
            return <></>
          }

          return (
            <TableRow hover>
              <TableCell component="th" scope="row">
                <Box fontWeight="900">
                  {!!labels[id] ? labels[id] : id}:
                </Box>
              </TableCell>
              <TableCell align="center">
                {applyFormat(value, formatter)}
              </TableCell>
            </TableRow>
          );
        }) }
      </TableBody>
    </Table>
  </TableContainer>
)

const NewRequest = props => {
  const {
    viewLabel,
    view,
    clientData
  } = props;

  return (
    <>
      <Typography align="center" variant="h5">
        סוג הביטוח: <Box
          display="inline"
          fontWeight="800"
        >
          {viewLabel}
        </Box>
      </Typography>
      <Box mb={3}/>
      <Grid container spacing={8}>
        <Grid item xs={7}>
          <Paper elevation={3}>
            <Box p={5} pt={2}>
              <Typography align="left" variant="h4">
                מלא פרטים:
              </Typography>
              <FillDetails insurenceType={view}/>
            </Box>
          </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper>
              <Box p={5} pt={2}>
                <Typography align="left" variant="h4">
                  פרטי החברה: <Box fontSize="0.75rem"> (כפי שיוצגו לחברות הביטוח) </Box>
                </Typography>
                <Box mt={2}/>
                <DataList data={clientData}/>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      <img style={{
        opacity: "0.09",
        width: "80%",
        height:"70%",
        position: "fixed",
        left:"0",
        bottom: "40%",
        zIndex: "-1"
      }} src={newBack}></img>
    </>
  );
}

NewRequest.propTypes = propTypes;

export default NewRequest;
