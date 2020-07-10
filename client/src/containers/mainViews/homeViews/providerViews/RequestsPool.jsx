import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  Box,
  Modal,
  Button,
  Card,
  CardContent,
  Divider,
  Container,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import {
  filterRequests as filterRequestsThunk,
  fetchRequest as fetchRequestThunk,
  setOffer as setOfferThunk,
  sendMessage,
} from "../../../../redux/thunks/provider";
import { getFilteredRequests, getFetchedRequest } from "../../../../redux/selectors/provider";

import { typeButtons } from "../../../../constants/structure/requestsPool";
import { filterButtons } from "../../../../constants/structure/requestsPool";
import { providerPoolChosenHeaders as chosenHeaders, tableHeaders } from "../../../../constants/structure/request";

import CustomTable from "../../../../components/Table/Table";
import ProviderRequestModal from "../../../../components/RequestModal/ProviderRequestModal";
import skylineBack from "../../../../assets/img/skyline-back.png";
import {
  getFetchedRequestErrors,
  getSetOfferErrors,
  getSendMessageErrors,
} from "../../../../redux/selectors/errors";
import { getUserData } from "../../../../redux/selectors/user";

const toRequestFilters = filters => (
  _.map(
    _.filter(
      filters,
      "isActive"
    ), "id"
  )
)

const ProviderRequestsPool = props => {
  const {
    requests,
    filterRequests,
    fetchRequest,
    setOffer,
    fetchRequestLoading,
    fetchedRequest,
    provider,
    setOfferStatus,
    sendMessage,
    sendMessageStatus,
  } = props;

  const [openedRequestId, setOpenedRequest] = useState(null);
  const [activeType, setActiveType] = useState(typeButtons[0].id);
  const [activeFilters, setActiveFilters] = useState(_.keyBy(filterButtons, "id"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    filterRequests(activeType, toRequestFilters(activeFilters), page * rowsPerPage, rowsPerPage);
  }, [activeType, activeFilters])

  const onOpenRequest = e => {
    setOpenedRequest(e._id);
    fetchRequest(e._id)
  };
  const onCloseRequest = () => setOpenedRequest(null);
  const onTypeSelect = id => setActiveType(id);
  const onFilterSelect = id => {
    setActiveFilters({
      ...activeFilters,
      [id]: { isActive: !activeFilters[id].isActive }
    });
  };

  const isModalOpen = !!openedRequestId;

  return (
    <>
      <Typography variant="h5" align="center">
        הצע מימון לבקשות חדשות
      </Typography>
      <Typography variant="subtitle2" align="center">
        הפעל סינונים לצמצום
      </Typography>
      <Box mt={2}/>
      <Card>
        <CardContent>
          <Grid spacing={3} container justify="center">
            {_.map(typeButtons, data =>
              <Grid item>
                <Button
                  color="primary"
                  size="medium"
                  variant={data.id === activeType ? "contained" : "outlined"}
                  onClick={() => onTypeSelect(data.id)}
                  endIcon={<data.icon/>}
                >
                  {data.label}
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid spacing={5} container justify="center">
            {_.map(filterButtons, data =>
              <Grid item>
                <Button
                  color="primary"
                  size="small"
                  variant={activeFilters[data.id].isActive ? "contained" : "outlined"}
                  onClick={() => onFilterSelect(data.id)}
                >
                  {data.label}
                  {activeFilters[data.id].isActive ? " ✓ " : ""}
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider/>
        <CardContent>
          <Box pb={1}>
            <CustomTable
              rows={requests}
              columns={_.map(chosenHeaders, column => tableHeaders[column])}
              filter
              sort
              onRowClick={onOpenRequest}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              page={page}
              onPageChange={setPage}
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
              {
                fetchRequestLoading
                ?
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
                : <ProviderRequestModal
                    data={fetchedRequest}
                    onSetOffer={setOffer}
                    provider={provider}
                    setOfferStatus={setOfferStatus}
                    sendMessage={sendMessage}
                    sendMessageStatus={sendMessageStatus}
                  />
              }
            </Modal>
          </Box>
        </CardContent>
        <img style={{
          opacity: "0.15",
          width: "100%",
          height:"50%",
          position: "fixed",
          left:"0",
          bottom: "0",
          zIndex: "-1"
        }} src={skylineBack}></img>
      </Card>
    </>
  );
}

const mapStateToProps = state => ({
  requests: getFilteredRequests(state),
  fetchRequestLoading: getFetchedRequestErrors(state),
  fetchedRequest: getFetchedRequest(state),
  provider: getUserData(state),
  setOfferStatus: getSetOfferErrors(state),
  sendMessageStatus: getSendMessageErrors(state),
});

const mapDispatchToProps = dispatch => ({
  filterRequests: filterRequestsThunk(dispatch),
  fetchRequest: fetchRequestThunk(dispatch),
  setOffer: setOfferThunk(dispatch),
  sendMessage: sendMessage(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderRequestsPool);