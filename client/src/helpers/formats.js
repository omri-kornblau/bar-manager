import _ from "lodash";
import React, { cloneElement } from "react";
import Moment from 'moment-with-locales-es6';

import {
  Done as DoneIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';
import {
  Box,
  Grid,
} from "@material-ui/core";
export const applyFormat = (value, formatter, other) => {
  return !!formatter ? formatter(value, other) : _.isNil(value) ? "<Blank>" : value;
}

export const formatYesNo = val => val ? "כן" : "לא";
export const formatAccept = val => val ? <DoneIcon/> : <ClearIcon/>;
export const formatShekel = val => `${val} אלף ש"ח`;
export const formatLength = val => _.isArray(val) ? val.length : 0;
export const formatMonths = val =>  `${val} חודשים`;
export const formatTimeStampRTL = time => Moment(time).format("HH:mm:ss DD/MM/YYYY");
export const formatTimeStampMessageTime = time => Moment(time).format("HH:mm");
export const formatTextWithLineEnds = text => text.split(/\n/g).map(part => <>{part}<br/></>);
export const formatTimeStampDate = time => Moment(time).format("DD/MM/YYYY");
export const formatActions = (actions, row) => {
  return (
    <Grid container justify="center">
      {
        actions.map(action =>
          <>
            {cloneElement(action, {actionParams: row})}
            <Box ml={1}/>
          </>
        )
      }
    </Grid>
  )
}
export const formatTimeDiff = time => {
  Moment.locale('he')
  return Moment(time).fromNow();
}
