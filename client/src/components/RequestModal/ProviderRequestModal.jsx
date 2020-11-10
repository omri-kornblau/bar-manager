import _ from "lodash";
import React, { useState, useCallback, useEffect } from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Button,
  AppBar,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody
} from '@material-ui/core';

import { labels } from "../../constants/hebrew/request";
import {
  modalChosenHeaders,
  providerModalFeatures
} from "../../constants/structure/request"
import { applyFormat, formatActions } from "../../helpers/formats";
import {
  providerProgressBar
} from "../../constants/structure/request"
import ProviderOfferBox from "./ProviderOfferBox";
import ProviderMessageBox from "./ProviderMessageBox";

const DataList = ({ data }) => (
  <TableContainer component={Paper} variant="outlined">
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

const NoDataModal = () =>
  <Paper>
    <Box p={3}>
      <Typography variant="h6">
        אין מידע על פוליסה זו
      </Typography>
    </Box>
  </Paper>

const ProviderRequestModal = props => {
  const {
    data,
    onSetOffer,
    provider,
    setOfferStatus,
    sendMessage,
    sendMessageStatus,
  } = props;

  const [selectedTab, setSelectedTab] = useState(0);

  if (_.isNil(data)) {
    return <NoDataModal/>
  }

  const onTabChange = (e, val) => setSelectedTab(val);
  const TabPanel = useCallback(({ index, children }) =>
    <div hidden={index === selectedTab}>{children}</div>,
  [selectedTab]);

  const _onSetOffer = value => {
    onSetOffer(data._id, value);
  };

  const onSendMessage = value => {
    sendMessage(data._id, value);
  };

  const allowOffer = _.get(providerModalFeatures[data.status], "offer");

  return (
    <Container maxWidth="md">
      <Paper>
        <Box
          height="inherit"
          maxHeight="95vh"
          p={4}
          style={{
            overflowY: "auto",
          }}
        >
          <Box fontWeight="900">
            <Typography align="center" variant="h5">
              בקשה מאת
              {" "}{data.author.name}
            </Typography>
          </Box>
          <Box mt={2}/>
          <Divider orientation="horizontal"/>
          <Tabs
            value={selectedTab}
            onChange={onTabChange}
            indicatorColor="primary"
            centered
          >
            <Tab label="פרטים"/>
            <Tab label="הגש הצעה"/>
          </Tabs>
          <Divider orientation="horizontal"/>
          <Box mt={2}/>
          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  פרטי הבקשה
                </Typography>
                <Box m={2}>
                  <DataList data={data}/>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" variant="h6">
                  פרטי מבקש הביטוח
                </Typography>
                <Box m={2}>
                  <DataList data={data.author}/>
                </Box>
              </Grid>
            </Grid>
            <Box mt={2}/>
            {formatActions(providerProgressBar.active.actions, data)}
          </TabPanel>
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הגש הצעה
                </Typography>
                <Box mt={1}/>
                <ProviderOfferBox
                  myOffer={data.myOffer.price}
                  offers={data.offers}
                  onSetOffer={_onSetOffer}
                  setOfferStatus={setOfferStatus}
                  allowOffer={allowOffer}
                  maxPrice={data.maxPrice}
                />
                <Box mt={1}/>
              </Grid>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הודעות למבוטח
                </Typography>
                <Box mt={2}/>
                <ProviderMessageBox
                  provider={provider}
                  messages={data.messages}
                  onSendMessage={onSendMessage}
                  sendMessageStatus={sendMessageStatus}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProviderRequestModal;
