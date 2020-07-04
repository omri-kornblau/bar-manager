import _ from "lodash";
import React, { useState, useCallback } from 'react';
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
  modalEditFormStructure
} from "../../constants/structure/request"
import { applyFormat } from "../../helpers/formats";
import LoadingButton from "../LoadingButton/LoadingButton";
import { parseFormError } from "../../helpers/errors";
import ErrorMessage from "../LoadingButton/ErrorMessage";

import { progressBar } from "../../constants/structure/request"
import {formatActions} from "../../helpers/formats"
import { cloneElement } from "react";
import ProviderMessagesBox from "./ProviderMessageBox";
import ProviderOfferBox from "./ProviderOfferBox";

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
    setOfferLoading,
    sendMessage,
    sendMessageLoading,
  } = props;

  const [selectedTab, setSelectedTab] = useState(0);

  if (_.isNil(data)) {
    return <NoDataModal/>
  }

  const onTabChange = (e, val) => setSelectedTab(val);
  const TabPanel = ({ index, children }) => <div hidden={index === selectedTab}>{children}</div>
  const _onSetOffer = value => {
    onSetOffer(data._id, value);
  }

  const _onSendMessage = value => {
    sendMessage(data._id, value);
  }

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
              {" "}{data.author._id}
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
          </TabPanel>
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הגש הצעה
                </Typography>
                <Box mt={1}/>
                <ProviderOfferBox
                  provider={provider}
                  myOffer={data.myOffer.price}
                  offers={data.offers}
                  onSetOffer={_onSetOffer}
                  setOfferLoading={setOfferLoading}
                />
              </Grid>
              <Grid item xs>
                <Typography align="center" variant="h6">
                  הודעות
                </Typography>
                <Box mt={2}/>
                <ProviderMessagesBox
                  messages={data.messages}
                  sendMessage={_onSendMessage}
                  sendMessageLoading={sendMessageLoading}
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
