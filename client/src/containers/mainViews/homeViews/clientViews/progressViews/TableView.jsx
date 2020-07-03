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

import { getProgress } from "../../../../../redux/selectors/progressBar";
import { getView } from "../../../../../redux/selectors/sidebar"
import {
  getOpenedRequest,
  getRequests,
  getRequestEditMode
} from "../../../../../redux/selectors/request";

import {
  tableHeaders,
  progressBar,
} from "../../../../../constants/structure/request";
import { updateRequest as updateRequestThunk } from "../../../../../redux/thunks/client";

import CustomTable from "../../../../../components/Table/Table";
import RequestModal from "../../../../../components/RequestModal/RequestModal";
import { getUpdateRequestErrors } from "../../../../../redux/selectors/errors";
import { getTableHeaders } from "../../../../../helpers/structer";


const TableView = props => {
  const {
    location,
    openedRequestIdx,
    editMode,
    requests,
    progress,
    type,
    pushUrl,
    updateRequest,
    updateStatus
  } = props;

  const {
    label,
    description,
    chosenHeaders,
    actions,
  } = progressBar[progress];

  const isModalOpen = !!openedRequestIdx;
  const { query, pathname: url } = location;

  const progressRequests = useMemo(() => (
    requests
      .filter(request => request.status === progress && request.type === type)
  ), [requests, progress]);

  const onOpenRequest = useCallback(requestData => {
    pushUrl(stringifyUrl({ url, query: { ...query, or: requestData.index }}));
  }, [query])

  const onCloseRequest = () => {
    delete query.or;
    pushUrl(stringifyUrl({ url, query }));
  }

  const onEnterEditMode = useCallback(() => {
    pushUrl(stringifyUrl({ url, query: { ...query, em: true }}));
  }, [query])

  const onSaveEdit = useCallback(editedRequest => {
    updateRequest(editedRequest);
  }, [query])

  const onExitEditMode = () => {
    delete query.em;
    pushUrl(stringifyUrl({ url, query }));
  }

  return (
    <Box pb={1}>
      <Grid container justify="center">
        <Box mb={2} mt={3}>
          <Typography variant="h5" color="inherit" align="center">
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
        columns={getTableHeaders(chosenHeaders, actions, tableHeaders)}
        filter
        sort
        actions={actions}
        onRowClick={onOpenRequest}
      />
      <Modal
        open={isModalOpen}
        onClose={onCloseRequest}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RequestModal
          data={requests[openedRequestIdx]}
          onEnterEdit={onEnterEditMode}
          onSaveEdit={onSaveEdit}
          onExitEdit={onExitEditMode}
          editMode={editMode}
          updateStatus={updateStatus}
        />
      </Modal>
    </Box>
  );
}

const mapStateToProps = state => ({
  progress: getProgress(state, getView(state)),
  type: getView(state),
  requests: getRequests(state),
  openedRequestIdx: getOpenedRequest(state),
  editMode: getRequestEditMode(state),
  location: getLocation(state),
  updateStatus: getUpdateRequestErrors(state)
})

const mapDispatchToProps = dispatch => ({
  pushUrl: _.flow(push, dispatch),
  updateRequest: updateRequestThunk(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
