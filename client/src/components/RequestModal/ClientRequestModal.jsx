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
  IconButton,
} from '@material-ui/core';
import {
  Refresh as RefreshIcon
} from "@material-ui/icons";

import { labels } from "../../constants/hebrew/request";
import {
  modalChosenHeaders,
  modalEditFormStructure
} from "../../constants/structure/request"
import MessagesBox from "./MessagesBox";
import FormBody from "../Form/FormBody";
import { applyFormat } from "../../helpers/formats";
import LoadingButton from "../LoadingButton/LoadingButton";
import { parseFormError } from "../../helpers/errors";
import ErrorMessage from "../LoadingButton/ErrorMessage";

import {
  ClinetProgressBar as progressBar,
} from "../../constants/structure/request"
import {formatActions} from "../../helpers/formats"

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

const EditDataList = props => {
  const {
    data,
    onSubmit,
    onExit,
    updateStatus
  } = props;

  const [form, setForm] = useState(data);

  const _onSubmit = useCallback(e => {
    e.preventDefault();
    onSubmit(form);
  }, [form])

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }))
  }, []);

  const parsedError = parseFormError(updateStatus.error)

  return (
    <form onSubmit={_onSubmit}>
      <FormBody
        formStructure={modalEditFormStructure}
        values={form}
        variant="outlined"
        size="small"
        margin="dense"
        spacing={1}
        onChange={onChange}
        error={parsedError}
      />
      <Box mt={2}/>
      <Grid container justify="center">
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          loading={updateStatus.inProgress}
        >
          עדכן פרטים
        </LoadingButton>
        <Box mr={2}/>
        <Button
          size="small"
          onClick={onExit}
        >
          בטל
        </Button>
      </Grid>
      <Box mt={2}/>
      <ErrorMessage
        error={parsedError}
        defaultText="יש לתקן את הטופס"
      />
    </form>
  );
}

const NoDataModal = () =>
  <Paper>
    <Box p={3}>
      <Typography variant="h6">
        אין מידע על פוליסה זו
      </Typography>
    </Box>
  </Paper>

const RequestModal = props => {
  const {
    data,
    client,
    editMode,
    onEnterEdit,
    onSaveEdit,
    onExitEdit,
    updateStatus,
    sendMessage,
    sendMessageStatus,
    getMessages
  } = props;

  if (_.isNil(data)) {
    return <NoDataModal/>
  }

  const onSendMessage = (value, providerId) => {
    sendMessage(data._id, providerId, value);
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
            <Typography align="center" variant="h4">
              בקשה מס'
              {" "}{data.index}
            </Typography>
          </Box>
          <Box mt={4}/>
          <Grid container spacing={4}>
            <Grid item xs>
              <Box mt={2}/>
              {editMode ?
                <EditDataList
                  onExit={onExitEdit}
                  onSubmit={onSaveEdit}
                  data={data}
                  updateStatus={updateStatus}
                />
                : <DataList data={data}/>
              }
              <Box mt={1}/>
              <Divider/>
              <Box mt={1}/>
              {!editMode ?
              <>
                <Typography align="center">כלים</Typography>
                <Box mt={2}/>
                {formatActions(progressBar[data.status].actions, data)}
              </>
              : <></>}
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs={7}>
              <Typography align="center" variant="h5">
                הודעות ממבטחים
                <IconButton onClick={() => getMessages(data._id)}>
                  <RefreshIcon/>
                </IconButton>
              </Typography>
              <Box mt={1}/>
              <MessagesBox
                client={client}
                messages={data.messages}
                onSendMessage={onSendMessage}
                sendMessageStatus={sendMessageStatus}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default RequestModal;
