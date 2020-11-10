import _ from "lodash";
import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  Box,
  InputAdornment,
  Typography,
  CircularProgress,
  Chip, Tooltip, TextField
} from "@material-ui/core";

import FormBody from "../Form/FormBody";
import {
  createRequest as createRequestThunk,
} from "../../redux/thunks/client"
import { parseFormError } from "../../helpers/errors";
import { getCreateRequestErrors } from "../../redux/selectors/errors";
import LoadingButton from "../LoadingButton/LoadingButton";
import ErrorMessage from "../LoadingButton/ErrorMessage";
import moment from "moment";
import { insuranceStartTimeOffest, maxTenderDuration, minTenderDuration } from "../../constants/structure/request";

const structure =
  [[
    {
      label: "תיאור תמציתי של הנכס (נשוא הביטוח)",
      name: "assetDescription",
      fullWidth: true,
      required: true,
      multiline: true,
      rows: 3,
      placeholder: "הכנס תיאור כאן.."
    },
  ],[
    {
      label: "תקופת הביטוח המבוקשת",
      type: "number",
      name: "insuranceDuration",
      fullWidth: true,
      justify: "center",
      required: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">חודשים</InputAdornment>,
      }
    },
    {
      label: "פרמיה מירבית מבוקשת",
      fullWidth: false,
      name: "maxPrice",
      justify: "center",
      type: "number",
      required: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">₪k</InputAdornment>,
      }
    }
  ],[
    {
      label: "תאריך סיום המכרז",
      type: "date",
      name: "tenderFinalDate",
      fullWidth: true,
      justify: "center",
      required: true,
      defaultValue: moment().add(minTenderDuration, "days"),
      minDate: moment().add(minTenderDuration, "days"),
      maxDate: moment().add(maxTenderDuration, "days"),
    },
    {
      type: "preview",
      value: "tenderFinalDate",
      element: props => {
        const {
          value
        } = props;

        const currentMoment = _.isNil(value) ? moment() : moment(value);
        const insuranceTime = currentMoment.add(insuranceStartTimeOffest, "days");
        const dateFormat = new Intl.DateTimeFormat('en-GB').format(insuranceTime);
        const timeFormat = `${insuranceTime.hours()}:${insuranceTime.minutes()}`;
        return (
          <Tooltip title="תאריך זה הינו 2 ימים לאחר סיום המכרז">
            <TextField
              label="תאריך העמדת הפוליסה:"
              value={`${dateFormat} ${timeFormat}`}
            />
          </Tooltip>
        )
      }
    },
  ],[
    {
      label: "האם הנכס היה מבוטח בשנה האחרונה",
      name: "wasInsuredOneYearAgo",
      type: "checkbox",
      fullWidth: true,
    },
    {
      label: "היה מבוטח בשנתיים האחרונות",
      name: "wasInsuredTwoYearsAgo",
      type: "checkbox",
      fullWidth: true,
    },
  ],[
    {
      label: "הערות",
      name: "comments",
      fullWidth: true,
      required: true,
      multiline: true,
      rows: 2,
      placeholder: "הכנס הערות כאן..."
    },
  ],[
    {
      label: "העלה פוליסה",
      name: "policy",
      type: "file",
      justify: "center",
      enableDelete: true,
    },
  ],[
    {
      label: "קבצים נוספים",
      name: "extraFiles",
      type: "file",
      justify: "center",
      enableDelete: true,
      multiple: true,
    },
  ]
];

const FillDetails = props => {
  const {
    createRequest,
    insurenceType,
    createRequestStatus
  } = props;

  const [form, setForm] = useState(structure.reduce((pre, currentRow) => {
    return {
      ...pre,
      ...currentRow.reduce((preItem, curItem) => {
        return _.isNil(curItem.defaultValue)
          ? preItem
          : {
              ...preItem,
              [curItem.name]: curItem.defaultValue,
            };
      }, {})
    };
  }, {}));

  const parsedError = parseFormError(createRequestStatus.error);

  const onChange = useCallback(e => {
    const { name, value, } = e.target;
    setForm(form => ({...form, [name]: value}));
  }, [])

  const onSubmit = useCallback(e => {
    e.preventDefault();
    createRequest({...form, type: insurenceType});
  }, [form]);

  return (
    <form noValidate onSubmit={onSubmit}>
      <FormBody
        formStructure={structure}
        spacing={2}
        margin="dense"
        onChange={onChange}
        error={parsedError}
        values={form}
      />
      <Box mt={3}/>
      <ErrorMessage
        error={parsedError}
        defaultText="יש לתקן את הטופס"
      />
      <Grid container justify="center">
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={createRequestStatus.inProgress}
        >
          שלח בקשה
        </LoadingButton>
      </Grid>
    </form>
  );
}

const mapStateToProps = state => ({
  createRequestStatus: getCreateRequestErrors(state)
})

const mapDispatchToProps = dispatch => ({
  createRequest: createRequestThunk(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FillDetails);
