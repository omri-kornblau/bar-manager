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
  Tab
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
  modalChosenHeaders.map(headStruct => {
    const { id, formatter } = headStruct;
    const value = data[id];

    if (_.isNil(value)) {
      return <></>
    }

    return (
      <Grid container alignItems="center" justify="flex-start">
        <Typography variant="subtitle1">
          <Box fontWeight="900" mr={2}>
            {!!labels[id] ? labels[id] : id}:
          </Box>
        </Typography>
        <Typography align="left" variant="body2">
          {applyFormat(value, formatter)}
        </Typography>
      </Grid>
    );
  })
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
              {data._id}
            </Typography>
            <Typography align="center" variant="subtitle2">
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
            <Tab label="הצעה"/>
          </Tabs>
          <Divider orientation="horizontal"/>
          <Box mt={2}/>
          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  פרטי הבקשה
                </Typography>
                <Box mt={2}/>
                <DataList data={data}/>
                <Box mt={1}/>
              </Grid>
              <Grid item xs={7}>
                <Typography align="center" variant="h6">
                  פרטי מבקש הביטוח
                </Typography>
                <Box mt={2}/>
                <DataList data={data.author}/>
              </Grid>
            </Grid>
            {formatActions(providerProgressBar.active.actions, data)}
          </TabPanel>
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הגש הצעה
                </Typography>
                <ProviderOfferBox
                  provider={provider}
                  myOffer={data.myOffer.price}
                  offers={data.offers}
                  onSetOffer={_onSetOffer}
                  setOfferStatus={setOfferStatus}
                  allowOffer={allowOffer}
                />
                <Box mt={1}/>
              </Grid>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הודעות
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
