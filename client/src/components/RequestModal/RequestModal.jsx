import _ from "lodash";
import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Divider,
} from '@material-ui/core';

import { labels } from "../../constants/hebrew/request";
import { modalChosenHeaders } from "../../constants/structure/request"
import MessagesBox from "./MessagesBox";

const DataList = ({ data }) => (
  _.map(modalChosenHeaders, key => {
    if (_.isNil(data[key])) {
      return <></>
    }

    return (
      <Grid container alignItems="center" justify="flex-start">
        <Typography variant="subtitle1">
          <Box fontWeight="900" mr={2}>
            {!!labels[key] ? labels[key] : key}:
          </Box>
        </Typography>
        <Typography align="left" variant="body2">
          {data[key]}
        </Typography>
      </Grid>
    );
  })
)

const RequestModal = props => {
  const {
    data
  } = props;

  return (
    <Container maxWidth="md">
      <Paper>
        <Box p={4}>
          <Box fontWeight="900">
            <Typography align="center" variant="h4">
              בקשה מס'
              {" "}{data.index}
            </Typography>
          </Box>
          <Box mt={4}/>
          <Grid container spacing={4}>
            <Grid item xs>
              <Typography align="center" variant="h5">
                מידע
              </Typography>
              <Box mt={2}/>
              <DataList data={data}/>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs="7">
              <Typography align="center" variant="h5">
                הודעות ממבטחים
              </Typography>
              <Box mt={2}/>
              <MessagesBox messages={data.messages}/>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default RequestModal;
