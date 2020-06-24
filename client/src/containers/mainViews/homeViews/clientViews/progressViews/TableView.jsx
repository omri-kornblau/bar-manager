import _ from "lodash";
import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { stringifyUrl } from "query-string";
import {
  Typography,
  Grid,
  Box,
  Modal
} from "@material-ui/core";
import { push, getLocation } from "connected-react-router";

import { getRequests } from "../../../../../redux/selectors/main";
import { getProgress } from "../../../../../redux/selectors/progressBar";
import { getView } from "../../../../../redux/selectors/sidebar"
import { getOpenedRequest } from "../../../../../redux/selectors/request";

import CustomTable from "../../../../../components/Table/Table";
import RequestModal from "../../../../../components/RequestModal/RequestModal";

import {
  tableHeaders,
  progressBar,
} from "../../../../../constants/structure/request";

const TableView = props => {
  const {
    location,
    openedRequestIdx,
    requests,
    progress,
    type,
    pushUrl
  } = props;

  const { label, description, chosenHeaders } = progressBar[progress];

  const isModalOpen = !!openedRequestIdx;
  const { query, pathname: url } = location;

  const progressRequests = useMemo(() => (
    requests
      .filter(request => request.status === progress && request.type === type)
  ), [requests, progress]);

  const onGoToRequest = useCallback(requestData => {
    pushUrl(stringifyUrl({ url, query: { ...query, or: requestData.index }}));
  }, [])

  const onCloseRequest = () => {
    delete query.or;
    pushUrl(stringifyUrl({ url, query }));
  }

  return (
    <Box pb={1}>
      <Grid container justify="center">
        <Box mb={2} mt={3}>
          <Typography variant="h4" color="inherit" align="center">
            {label}
            <Typography variant="body2" color="inherit" align="center">
              {description}
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Box mb={2}/>
      <CustomTable
        rows={progressRequests}
        columns={chosenHeaders.map(column => tableHeaders[column])}
        isFilter
        isSort
        onRowClick={onGoToRequest}
      />
      <Modal
        open={isModalOpen}
        onClose={onCloseRequest}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <RequestModal data={requests[openedRequestIdx - 1]}/>
      </Modal>
    </Box>
  );
}

const mapStateToProps = state => ({
  progress: getProgress(state, getView(state)),
  type: getView(state),
  requests: getRequests(state),
  openedRequestIdx: getOpenedRequest(state),
  location: getLocation(state)
})

const mapDispatchToProps = dispatch => ({
  pushUrl: _.flow(push, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
