import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const iconHeight = 56;

export default makeStyles(theme => ({
  paper: {
    borderTopLeftRadius: theme.paper.borderRadius,
    borderTopRightRadius: theme.paper.borderRadius,
    backgroundColor: grey[100]
  },
  stepConnector: {
    top: `${iconHeight/2}px`,
    left: `calc(-50% + ${iconHeight/2}px)`,
    right: `calc(50% + ${iconHeight/2}px)`,
    position: "absolute",
  }
}))
