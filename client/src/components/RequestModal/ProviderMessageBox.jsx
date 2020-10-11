import _ from "lodash";
import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  List,
  Divider,
  TextField,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useState } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";

import Message from "./Message";

const ProviderMessagesBox = props => {
  const {
    messages,
    onSendMessage,
    sendMessageStatus,
    provider
  } = props;

  const [newMessage, setNewMessage] = useState("");

  const onMessageChange = e => {
    const { value } = e.target;
    setNewMessage(value);
  }

  const _onSendMessage = () => {
    onSendMessage(newMessage.trim());
    setNewMessage("");
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter' && !e.shiftKey){
      _onSendMessage();
    }
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
                <Message
                  data={message}
                  own={provider._id === message.from}
                />
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
          error={!_.isNil(sendMessageStatus.error)}
          value={newMessage}
          onKeyPress={handleKeyPress}
        />
        <Box mr={2}/>
        <LoadingButton
          size="small"
          color="primary"
          onClick={_onSendMessage}
          loading={sendMessageStatus.inProgress}
          fab
        >
          <SendIcon
            style={{
              transform: "rotate(180deg)"
            }}
          />
        </LoadingButton>
      </Grid>
    </Box>
  );
}

export default ProviderMessagesBox;
