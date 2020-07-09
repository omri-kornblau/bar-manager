import _ from "lodash";
import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Fab,
  ListItemAvatar
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { GradeRounded } from "@material-ui/icons";
import { useState } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";
import {
  formatTimeStampMessageTime, formatTextWithLineEnds,
} from "../../helpers/formats";

import useStyle from "./style";

const Message = ({ from, title,  body, timestamp }) => {
  const classes = useStyle();

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

const ProviderMessagesBox = props => {
  const {
    messages,
    sendMessage,
    sendMessageLoading,
  } = props;

  const [newMessage, setNewMessage] = useState("");

  const onMessageChange = e => {
    const {
      value
    } = e.target;
    setNewMessage(value);
  }

  const onSendMessage = () => {
    sendMessage(newMessage.trim());
  }

  return (
    <Box>
      <Divider/>
      <Box mt={1}/>
      {_.isEmpty(messages) ?
        <Typography align="left" variant="subtitle1">
          שלח הודעה לחברה:
        </Typography>
        :
        <>
          <List>
            {messages.map(message =>
              <>
                <Message {...message} />
                <Box mt={2}/>
              </>
            )}
          </List>
          <Divider/>
        </>
      }
      <Box mt={2}/>
      <Grid container alignItems="center">
        <TextField
          label="מלא את תוכן ההודעה.."
          multiline
          rows={4}
          variant="outlined"
          style={{ flex: 1 }}
          onChange={onMessageChange}
        />
        <Box mr={2}/>
        <LoadingButton
          size="small"
          color="primary"
          onClick={onSendMessage}
          loading={sendMessageLoading}
        >
          <SendIcon/>
        </LoadingButton>
      </Grid>
    </Box>
  );
}

export default ProviderMessagesBox;
