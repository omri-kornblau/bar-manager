import _ from "lodash";
import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { stringifyUrl } from "query-string";
import {
  Typography,
  Grid,
  Box,
  Modal,
  Fade,
  Backdrop,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { push, getLocation } from "connected-react-router";

import { getProgress } from "../../../../../redux/selectors/progressBar";
import { getView } from "../../../../../redux/selectors/sidebar"
import { getOpenedRequest } from "../../../../../redux/selectors/request";
import { getRequests, getRequestEditMode } from "../../../../../redux/selectors/request";
import { getUserData } from "../../../../../redux/selectors/user";
import {
  getSetOfferErrors,
  getSendMessageErrors,
  getFetchedRequestErrors
} from "../../../../../redux/selectors/errors";
import {
  setOffer as setOfferThunk,
  sendMessage as sendMessageThunk,
  fetchRequest as fetchRequestThunk,
} from "../../../../../redux/thunks/provider";
import {
  tableHeaders,
  providerProgressBar as progressBar,
} from "../../../../../constants/structure/request";

import CustomTable from "../../../../../components/Table/Table";
import ProviderRequestModal from "../../../../../components/RequestModal/ProviderRequestModal";
import { getFetchedRequest } from "../../../../../redux/selectors/provider";
import { useEffect } from "react";


const TableView = props => {
  const {
    location,
    openedRequestIdx,
    requests,
    progress,
    type,
    pushUrl,
    provider,
    setOffer,
    setOfferStatus,
    sendMessage,
    sendMessageStatus,
    fetchRequest,
    fetchedRequest,
    fetchRequestLoading
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
    pushUrl(stringifyUrl({ url, query: { ...query, or: requestData._id }}));
  }, [query])

  useEffect(() => {
    fetchRequest(openedRequestIdx);
  }, [query]);

  const onCloseRequest = () => {
    delete query.or;
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
        columns={[...chosenHeaders.map(column => tableHeaders[column]), ...(actions ? [tableHeaders.actions] : [])]}
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
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {fetchRequestLoading ?
          <Paper>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="60vw"
              height="90vh"
            >
              <CircularProgress color="primary" size={80}/>
            </Box>
          </Paper>
          :
          <ProviderRequestModal
            // Small check assure the correct request was opened
            data={_.get(fetchedRequest, "_id") === openedRequestIdx ? fetchedRequest : null}
            provider={provider}
            onSetOffer={setOffer}
            setOfferStatus={setOfferStatus}
            sendMessage={sendMessage}
            sendMessageStatus={sendMessageStatus}
          />
        }
      </Modal>
    </Box>
  );
}

const mapStateToProps = state => ({
  progress: getProgress(state, getView(state)),
  type: getView(state),
  requests: getRequests(state),
  openedRequestIdx: getOpenedRequest(state),
  location: getLocation(state),
  provider: getUserData(state),
  setOfferStatus: getSetOfferErrors(state),
  sendMessageStatus: getSendMessageErrors(state),
  fetchRequestLoading: getFetchedRequestErrors(state),
  fetchedRequest: getFetchedRequest(state),
})

const mapDispatchToProps = dispatch => ({
  pushUrl: _.flow(push, dispatch),
  setOffer: setOfferThunk(dispatch),
  fetchRequest: fetchRequestThunk(dispatch),
  sendMessage: sendMessageThunk(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableView);
