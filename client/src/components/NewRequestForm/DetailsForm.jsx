import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  Box,
  InputAdornment,
} from "@material-ui/core";

import FormBody from "../Form/FormBody";
import {
  newRequest,
} from "../../redux/thunks/client"

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
  ],
];

const FillDetails = props => {
  const {
    onSubmit,
    insurenceType,
  } = props;

  const [form, setForm] = useState({});

  const onChange = async e => {
    const {
      name,
      value,
    } = e.target;

    setForm({...form, [name]: value});
  }

  const _onSubmit = useCallback(e => {
    e.preventDefault();
    onSubmit({...form, type: insurenceType});
  }, [form]);

  return (
    <form onSubmit={_onSubmit}>
      <FormBody
        formStructure={structure}
        spacing={3}
        margin="dense"
        onChange={onChange}
      />
      <Box mt={5}/>
      <Grid spacing={3} container direction="column" align="center">
        <Box m={1}/>
        <Grid item>
          <Button
            variant="outlined"
            color="default"
          >
            העלה פוליסה
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="default"
          >
            העלה קבצים נוספים
          </Button>
        </Grid>
      </Grid>
      <Box mt={7}/>
      <Grid container justify="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={_onSubmit}
        >
          שלח בקשה
        </Button>
      </Grid>
    </form>
  );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  onSubmit: request => {
    newRequest(dispatch)(request);
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FillDetails);
