import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.white.active,
    '&:hover': {
      backgroundColor: theme.palette.success.darker,
    },
  },
  failed: {
    backgroundColor: theme.palette.failed.main,
    color: theme.palette.text.white.active,
    '&:hover': {
      backgroundColor: theme.palette.failed.darker,
    },
  },
}))
