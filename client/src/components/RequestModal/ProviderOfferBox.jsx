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
  Chip
} from '@material-ui/core';
import {
  Send as SendIcon ,
  GetApp as GetAppIcon
} from '@material-ui/icons';

import CustomTable from "../Table/Table";

const ProviderOfferBox = props => {
  const {
    offers
  } = props;

  const isOfferWinning = true;

  return (
    <Box>
      <Typography align="center" variant="subtitle1">
        <Box display="inline" mr={1} fontWeight={900}>
          הצעה נוכחית:
        </Box>
        <Chip
          label={`140,000 ש"ח`}
          size="small"
          color={isOfferWinning ? "primary" : "default"}
        />
      </Typography>
      <Box mt={1}/>
      <Grid justify="center" container alignItems="center">
        <TextField
          label="סכום הצעה חדש"
          variant="outlined"
          margin="dense"
          type="number"
        />
        <Box mr={2}/>
        <IconButton
          size="small"
          color="primary"
        >
          <GetAppIcon/>
        </IconButton>
        <Typography align="left" variant="caption">
          *לאחר הגשת ההצעה לא ניתן לבטלה
        </Typography>
      </Grid>
      <Box mt={4}/>
      {_.isEmpty(offers) ?
        <Typography align="center" variant="subtitle1">
          אין עדיין הצעות לבקשה זו
        </Typography>
        :
        <CustomTable
          rows={offers}
          columns={[
            { id: "provider", label: "חברה" },
            { id: "price", label: "מחיר מוצע" },
          ]}
          pagination={false}
        />
      }
    </Box>
  );
}

export default ProviderOfferBox;
