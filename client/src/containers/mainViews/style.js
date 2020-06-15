
import { makeStyles } from "@material-ui/core/styles";

import cityBackground from "../../assets/img/homepage.jpg";

export default makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflowX: 'auto',
    overflowY: 'scroll',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  cityBackground: {
    backgroundImage: `url(${cityBackground})`,
    borderBottom: `solid 5px ` + theme.palette.primary.dark,
  },
  pageHeaderContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  pageHeader: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.white.active,
    position: "absolute",
    padding: "10px 30px 10px 30px",
    userSelect: "none"
  },
}))
