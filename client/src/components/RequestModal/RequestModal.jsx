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
} from '@material-ui/core';

import { labels } from "../../constants/hebrew/request";
import {
  modalChosenHeaders,
  modalEditFormStructure
} from "../../constants/structure/request"
import MessagesBox from "./MessagesBox";
import FormBody from "../Form/FormBody";
import { applyFormat } from "../../helpers/formats";

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
    onExit
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
      />
      <Box mt={2}/>
      <Grid container justify="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          עדכן פרטים
        </Button>
        <Box mr={2}/>
        <Button
          size="small"
          onClick={onExit}
        >
          בטל
        </Button>
      </Grid>
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
    editMode,
    onEnterEdit,
    onSaveEdit,
    onExitEdit
  } = props;

  if (_.isNil(data)) {
    return <NoDataModal/>
  }

  return (
    <Container maxWidth="md">
      <Paper>
        <Box
          height="90vh"
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
                />
                : <DataList data={data}/>
              }
              <Box mt={2}/>
              {!editMode ?
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={onEnterEdit}
                  >
                    ערוך
                  </Button>
                </Grid>
              : <></>}
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs={7}>
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
