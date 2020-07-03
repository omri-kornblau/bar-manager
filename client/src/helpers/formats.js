import React, { cloneElement } from "react";
import Moment from "moment";
import {
  Done as DoneIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';
import {
  Box,
  Grid,
} from "@material-ui/core";
export const applyFormat = (value, formatter, other) => {
  return !!formatter ? formatter(value, other) : value
}

export const formatYesNo = val => val ? "כן" : "לא";
export const formatAccept = val => val ? <DoneIcon/> : <ClearIcon/>;
export const formatShekel = val =>  `${val} אלף ש"ח`;
export const formatMonths = val =>  `${val} חודשים`;
export const formatTimeStampRTL = time => Moment(time).format("HH:mm:ss YYYY/MM/DD");
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
