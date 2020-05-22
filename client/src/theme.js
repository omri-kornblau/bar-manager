import { createMuiTheme } from "@material-ui/core";
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[800]
    },
  },
});

export default theme;
