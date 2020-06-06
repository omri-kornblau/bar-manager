import { makeStyles } from "@material-ui/core/styles";
import { common } from "@material-ui/core/colors";

const iconHeight = 56;

export default makeStyles(theme => ({
  fab: {
    // shado: theme.palette.text.primary,
  },
  stepConnector: {
    top: `${iconHeight/2}px`,
    left: `calc(-50% + ${iconHeight/2}px)`,
    right: `calc(50% + ${iconHeight/2}px)`,
    position: "absolute",
  }
}))
