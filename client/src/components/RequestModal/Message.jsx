import _ from "lodash";
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

import useStyle from "./style";

import {
  formatTimeStampMessageTime,
  formatTextWithLineEnds
} from "../../helpers/formats";

const Message = props => {
  const {
    data,
    own
  } = props;

  const classes = useStyle();
  const { from, title, body, timestamp } = data;

  if (own) {
    return (
      <Paper className={classes.messagePaper} elevation={1}>
        <ListItem className={classes.messageContainer}>
          <ListItemAvatar>
            <Typography component="p" variant="caption" align="left">
              <Box fontWeight="800">
                {formatTimeStampMessageTime(timestamp)}
              </Box>
            </Typography>
          </ListItemAvatar>
          <Box mr={1}/>
          <ListItemText>
            <div style={{ overflowWrap: "anywhere"}}>
              <Typography variant="body2">
                {formatTextWithLineEnds(body)}
              </Typography>
            </div>
          </ListItemText>
        </ListItem>
      </Paper>
    )
  } else {
    return (
      <Paper className={classes.messageContainer} elevation={1}>
        <ListItem className={classes.messageContainer}>
          <ListItemText>
            <div style={{ overflowWrap: "anywhere"}}>
              <Typography variant="body2">
                {formatTextWithLineEnds(body)}
              </Typography>
            </div>
          </ListItemText>
          <Box mr={3}/>
          <ListItemAvatar>
            <Typography component="p" variant="caption" align="right">
              <Box fontWeight="800">
                {formatTimeStampMessageTime(timestamp)}
              </Box>
            </Typography>
          </ListItemAvatar>
        </ListItem>
      </Paper>
    )
  }
}

export default Message;
