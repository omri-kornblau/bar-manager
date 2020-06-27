import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  Box,
  InputAdornment,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import FormBody from "../Form/FormBody";
import {
  createRequest as createRequestThunk,
} from "../../redux/thunks/client"
import { parseFormError } from "../../helpers/errors";
import { getCreateRequestErrors } from "../../redux/selectors/errors";
import LoadingButton from "../LoadingButton/LoadingButton";
import ErrorMessage from "../LoadingButton/ErrorMessage";

const structure =
  [[
    {
      label: "תיאור תמציתי של הנכס",
      name: "assetDescription",
      fullWidth: true,
      required: true,
      multiline: true,
      rows: 2,
      placeholder: "הכנס תיאור כאן.."
    },
  ],[
    {
      label: "תיאור תמציתי של החברה",
      name: "companyDescription",
      fullWidth: true,
      required: true,
      multiline: true,
      rows: 2,
      placeholder: "הכנס תיאור כאן.."
    },
  ],[
    {
      label: "תקופת הביטוח הרצויה",
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
      label: "פרמיה מקסימלית רצויה",
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
      label: "מבוטח כרגע",
      name: "isCurrentlyInsured",
      type: "checkbox",
      fullWidth: false,
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
    },
  ],[
    {
      label: "קבצים נוספים",
      name: "extraFiles",
      type: "file",
      justify: "center",
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

  const [form, setForm] = useState({});
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
