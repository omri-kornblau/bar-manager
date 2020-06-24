import React, { useMemo } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  Box,
} from "@material-ui/core";

import CustomTable from "../../../../../components/Table/Table";
import { getRequests } from "../../../../../redux/selectors/main";
import { getProgress } from "../../../../../redux/selectors/progressBar";
import { getView } from "../../../../../redux/selectors/sidebar"

import {
  columnsTypes,
  progressConf,
} from "./consts";

const TableView = props => {
  const {
    requests,
    progress,
    type,
  } = props;

  const conf = progressConf[progress];

  const progressRequests = useMemo(() => (
    requests
      .filter(request => request.status === progress && request.type === type)
  ), [requests, progress]);

  return (
    <div style={{paddingBottom: "1px"}}>
      <Grid container justify="center">
        <Box mb={2} mt={3}>
          <Typography variant="h4" color="inherit" align="center">
            {conf.label}
            <Typography variant="body2" color="inherit" align="center">
              {conf.description}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Box marginBottom={2}/>
      <CustomTable
        rows={progressRequests}
        columns={conf.columns.map(column => columnsTypes[column])}
        isFilter
      />
    </div>
  );
}

const mapStateToProps = state => ({
  progress: getProgress(state, getView(state)),
  type: getView(state),
  requests: getRequests(state),
})

export default connect(mapStateToProps)(TableView);
