import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Menu
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CheckIcon from "@material-ui/icons/Check";

import FillDetails from "../../../../../components/NewRequestForm/DetailsForm";

import newBack from "../../../../../assets/img/new-back.png"

const propTypes = {
  viewLabel: PropTypes.string
};

const NewRequest = props => {
  const {
    viewLabel,
    view,
  } = props;

  const [saveAnchorEl, setSaveAnchorEl] = useState(null);

  return (
    <>
      <Container maxWidth="sm">
        <Typography align="center" variant="h5">
          סוג הביטוח: <Box
            display="inline"
            fontWeight="800"
          >
            {viewLabel}
          </Box>
        </Typography>
        <Box mb={3}/>
        <Paper elevation={3}>
          <Menu
            id="simple-menu"
            anchorEl={saveAnchorEl}
            open={Boolean(saveAnchorEl)}
            onClose={() => setSaveAnchorEl(null)}
          >
            <Box ml={3} mt={1}>
              <form>
                <TextField size="small" variant="outlined" margin="dense" label="שם הבקשה">
                </TextField>
                <IconButton type="submit" size="medium">
                  <CheckIcon/>
                </IconButton>
              </form>
            </Box>
          </Menu>
          <IconButton size="medium" onClick={e => setSaveAnchorEl(e.currentTarget)}>
            <SaveIcon/>
          </IconButton>
          <Box p={5} pt={0}>
            <Typography align="left" variant="h4">
              מלא פרטים:
            </Typography>
            <FillDetails insurenceType={view}/>
          </Box>
        </Paper>
      </Container>
      <img style={{
        opacity: "0.09",
        width: "80%",
        height:"70%",
        position: "fixed",
        left:"0",
        bottom: "40%",
        zIndex: "-1"
      }} src={newBack}></img>
    </>
  );
}

NewRequest.propTypes = propTypes;

export default NewRequest;
