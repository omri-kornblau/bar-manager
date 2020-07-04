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

const ProviderMessagesBox = props => {
  const {
    messages
  } = props;

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
        />
        <Box mr={2}/>
        <Fab
          size="small"
          color="primary"
        >
          <SendIcon/>
        </Fab>
      </Grid>
    </Box>
  );
}

export default ProviderMessagesBox;
