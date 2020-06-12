
import { makeStyles } from "@material-ui/core/styles";

import cityBackground from "../../../../assets/img/homepage.jpg";

export default makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflowX: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflowY: "auto"
  },
  cityBackground: {
    backgroundImage: `url(${cityBackground})`,
    position: "fixed",
    width: "100vw",
    height: "100vh"
  },
  whiteText: {
    color: theme.palette.text.white.active
  }
}))
