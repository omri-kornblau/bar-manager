import _ from "lodash";
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  Divider,
  Button,
  Badge,
  TextField,
  Paper
} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send"

import LoadingButton from "../LoadingButton/LoadingButton";
import Message from "./Message";

const MessagesBox = props => {
  const {
    messages,
    onSendMessage,
    sendMessageStatus,
    client
  } = props;

  const [selectedProvider, setSelectedProvider] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const onMessageChange = e => {
    const { value } = e.target;
    setNewMessage(value);
  }

  const _onSendMessage = () => {
    onSendMessage(newMessage.trim(), selectedProvider);
  }

  return (
    <Box>
      <Box mt={1}/>
      {_.isEmpty(_.keys(messages)) ?
        <Typography align="center" variant="subtitle1">
          לא התקבלו הודעות
        </Typography>
        :
        <>
          <Paper variant="outlined">
            <Box m={1}>
              <Grid container direction="row" justify="center" spacing={2}>
                {_.map(messages, (providerMessages, key) =>
                  <Grid item>
                    <Badge
                      badgeContent={providerMessages[1].length}
                      color="error"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        variant={selectedProvider === key ? "contained" : "outlined"}
                        onClick={() => setSelectedProvider(key)}
                        key={key}
                      >
                        {providerMessages[0]}
                      </Button>
                    </Badge>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
          <Box mt={1}/>
          {!!messages[selectedProvider] && <>
            <List>
              {_.map(messages[selectedProvider][1], message =>
                <>
                  <Message
                    data={message}
                    own={message.from === client._id}
                  />
                  <Box mt={2}/>
                </>
              )}
            </List>
            <Divider/>
            <Box mt={3}/>
            <Grid container alignItems="center">
              <TextField
                label="מלא את תוכן ההודעה.."
                multiline
                rows={4}
                variant="outlined"
                style={{ flex: 1 }}
                onChange={onMessageChange}
                error={!_.isNil(sendMessageStatus.error)}
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
          </>}
        </>
      }
    </Box>
  );
}

export default MessagesBox;
