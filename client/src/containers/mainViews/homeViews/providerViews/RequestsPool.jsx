import _ from "lodash";
import React, { useMemo, useCallback, useState } from "react";
import { connect } from "react-redux";
import { stringifyUrl } from "query-string";
import {
  Typography,
  Grid,
  Box,
  Modal,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider
} from "@material-ui/core";
import { push, getLocation } from "connected-react-router";

import { getProgress } from "../../../../redux/selectors/progressBar";
import { getView } from "../../../../redux/selectors/sidebar"
import { getOpenedRequest } from "../../../../redux/selectors/request";
import { getRequests, getRequestEditMode } from "../../../../redux/selectors/request";
import { updateRequest as updateRequestThunk } from "../../../../redux/thunks/client";

import {
  tableHeaders,
  progressBar,
} from "../../../../constants/structure/request";
import { typeButtons } from "../../../../constants/structure/requestsPool";
import { filterButtons } from "../../../../constants/structure/requestsPool";

import CustomTable from "../../../../components/Table/Table";
import RequestModal from "../../../../components/RequestModal/RequestModal";
import { getUpdateRequestErrors } from "../../../../redux/selectors/errors";
import skylineBack from "../../../../assets/img/skyline-back.png";

const ProviderRequestsPool = props => {
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [activeType, setActiveType] = useState(typeButtons[0].id);
  const [activeFilters, setActiveFilters] = useState(_.keyBy(filterButtons, "id"));

  const progressRequests = useMemo(() => (
    [[]]
  ), [requests, progress]);

  const onOpenRequest = () => setModalOpen(true);
  const onCloseRequest = () => setModalOpen(false);
  const onTypeSelect = id => setActiveType(id);
  const onFilterSelect = id => setActiveFilters({
    ...activeFilters,
    [id]: { isActive: !activeFilters[id].isActive }
  });

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
              // rows={progressRequests}
              // columns={[...chosenHeaders.map(column => tableHeaders[column]), ...(actions ? [tableHeaders.actions] : [])]}
              filter
              sort
              // actions={actions}
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
                // data={requests[openedRequestIdx]}
                editMode={editMode}
              />
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

export default ProviderRequestsPool;
