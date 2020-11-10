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
  Send as SendIcon,
  GetApp as GetAppIcon
} from '@material-ui/icons';

import CustomTable from "../Table/Table";
import LoadingButton from "../LoadingButton/LoadingButton";
import { parseOfferBoxError } from "../../helpers/errors";
import { formatOtherProviderName, formatShekel } from "../../helpers/formats";

const ProviderOfferBox = props => {
  const {
    myOffer,
    offers,
    onSetOffer,
    setOfferStatus,
    allowOffer,
    maxPrice
  } = props;

  offers.sort((a, b) => a.price - b.price);
  const isOfferWinning = offers.length > 0 ?
    _.minBy(offers, offer => offer.price).price === myOffer
    : false;

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
          { allowOffer ? "הצעה נוכחית שלי:" : "מחיר סופי:" }
        </Box>
        <Chip
          label={myOffer ? formatShekel(myOffer) : "אין הצעה נוכחית"}
          size="small"
          color={isOfferWinning ? "primary" : "default"}
        />
      </Typography>
      <Box mt={1}/>
      {allowOffer &&
        <>
          <Typography align="center" variant="body1">
            <Box display="inline" mr={1} fontWeight={900}>
              פרמיה מקסימלית מבוקשת:
            </Box>
            <Chip
              label={formatShekel(maxPrice)}
              size="small"
              color={isOfferWinning ? "primary" : "default"}
            />
          </Typography>
          <Box mt={2}/>
          <Grid justify="center" container alignItems="center">
            <TextField
              label="סכום הצעה חדש"
              variant="outlined"
              margin="dense"
              type="number"
              value={newOffer}
              onChange={onOfferChange}
              error={!_.isNil(setOfferStatus.error)}
              inputProps={{
                min: 1
              }}
              helperText={parseOfferBoxError(setOfferStatus.error)}
            />
            <Box mr={2}/>
            <LoadingButton
              size="small"
              color="primary"
              onClick={_onSetOffer}
              loading={setOfferStatus.inProgress}
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
                { id: "provider", label: "חברה", formatter: formatOtherProviderName },
                { id: "price", label: "מחיר מוצע" },
              ]}
              pagination={false}
            />
          }
        </>
      }
    </Box>
  );
}

export default ProviderOfferBox;
