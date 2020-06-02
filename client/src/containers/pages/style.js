
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
    backgroundImage: `url(${cityBackground})`
  }
}))
