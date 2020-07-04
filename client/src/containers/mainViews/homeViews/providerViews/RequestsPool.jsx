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
  CardHeader,
  Divider
} from "@material-ui/core";

import { filterRequests } from "../../../../redux/thunks/provider";
import { getFilteredRequests } from "../../../../redux/selectors/provider";

import { typeButtons } from "../../../../constants/structure/requestsPool";
import { filterButtons } from "../../../../constants/structure/requestsPool";
import { providerPoolChosenHeaders as chosenHeaders, tableHeaders } from "../../../../constants/structure/request";

import CustomTable from "../../../../components/Table/Table";
import ProviderRequestModal from "../../../../components/RequestModal/ProviderRequestModal";
import skylineBack from "../../../../assets/img/skyline-back.png";

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
    pushUrl,
    progress,
    type,
    editMode,
  } = props;

  const [openedRequestId, setOpenedRequest] = useState("5eff2df0fc6b4c40bc0fcc53");
  const [activeType, setActiveType] = useState(typeButtons[0].id);
  const [activeFilters, setActiveFilters] = useState(_.keyBy(filterButtons, "id"));

  useEffect(() => {
    filterRequests(activeType, toRequestFilters(activeFilters));
  }, [activeType, activeFilters])

  const onOpenRequest = e => setOpenedRequest(e._id);
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
              <ProviderRequestModal
                data={_.find(requests, { _id: openedRequestId })}
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

const mapStateToProps = state => ({
  requests: getFilteredRequests(state)
});

const mapDispatchToProps = dispatch => ({
  filterRequests: filterRequests(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderRequestsPool);
