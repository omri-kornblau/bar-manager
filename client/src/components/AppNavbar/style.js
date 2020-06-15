import { makeStyles } from "@material-ui/core/styles";
import { common } from "@material-ui/core/colors";

export default makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: common.white,
    color: theme.palette.text.primary,
    borderTop: "solid 6px",
    borderTopColor: theme.palette.primary.main,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 40,
  },
  darkLink: {
    color: theme.palette.text.primary
  }
}))
