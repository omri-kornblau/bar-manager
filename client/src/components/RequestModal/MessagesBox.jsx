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
  Divider
} from '@material-ui/core';

const Message = ({ author, title, body, time }) => {
  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemText
          primary={author}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {title}:{" "}
              </Typography>
              {body}
            </>
          }
        />
        <ListItemText>
          <Box fontSize="80%" textAlign="right">
            {time}
          </Box>
        </ListItemText>
      </ListItem>
    </Box>
  )
}

const MessagesBox = props => {
  const {
    messages
  } = props;

  return (
    <Box>
      <Paper variant="elevated" elevation={2}>
        {_.isEmpty(messages) ?
          <Typography align="center" variant="h6">
            לא התקבלו הודעות
          </Typography>
          :
          <List>
            {messages.map(message =>
              <>
                <Message
                  {...message}
                />
                <Divider/>
              </>
            )}
          </List>
        }
      </Paper>
    </Box>
  );
}

export default MessagesBox;
