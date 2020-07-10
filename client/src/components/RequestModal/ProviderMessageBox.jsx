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
  Fab
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { GradeRounded } from "@material-ui/icons";
import { useState } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";

const Message = ({ from, title,  body, timestamp }) => {
  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemText
          primary={from}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {title}
              </Typography>
              {body}
            </>
          }
        />
        <ListItemText>
          <Box fontSize="80%" textAlign="right">
            {timestamp}
          </Box>
        </ListItemText>
      </ListItem>
    </Box>
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
      {/* <Paper variant="elevated" elevation={2}> */}
        {_.isEmpty(messages) ?
          <Typography align="center" variant="subtitle1">
            שלח הודעה לחברה:
          </Typography>
          :
          <List>
            {messages.map(message =>
              <>
                <Message {...message} />
                <Divider/>
              </>
            )}
          </List>
        }
      {/* </Paper> */}
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
