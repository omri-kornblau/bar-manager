import _ from "lodash";
import React, { useState } from 'react';
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
import LoadingButton from "../LoadingButton/LoadingButton";

const ProviderOfferBox = props => {
  const {
    provider,
    myOffer,
    offers,
    onSetOffer,
    setOfferLoading,
  } = props;

  offers.sort((a, b) => a.price - b.price);
  const isOfferWinning = _.maxBy(offers, offer => offer.price).provider === provider._id;

  const [newOffer, setNewOffer] = useState(myOffer)
  const _onSetOffer = e => {
    onSetOffer(newOffer);
  }

  const onOfferChange = e => {
    const {
      value
    } = e.target;

    setNewOffer(value);
  }

  return (
    <Box>
      <Typography align="center" variant="subtitle1">
        <Box display="inline" mr={1} fontWeight={900}>
          הצעה נוכחית:
        </Box>
        <Chip
          label={myOffer ? `${myOffer} ש"ח` : "אין הצעה נוכחית"}
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
          value={newOffer}
          onChange={onOfferChange}
        />
        <Box mr={2}/>
        <LoadingButton
          size="small"
          color="primary"
          onClick={_onSetOffer}
          loading={setOfferLoading}
        >
          <GetAppIcon/>
        </LoadingButton>
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
