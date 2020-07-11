import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  messageContainer: {
    width: "fit-content",
    alignItems: "flex-end",
    marginLeft: "auto"
  },
  messagePaper: {
    width: "fit-content",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.white.active
  },
}))
