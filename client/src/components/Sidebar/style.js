import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 180;
const closedDrawerWidth = 70;

const transitionConfig = "ease-in-out 0.24s";

export default makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transition: `width ${transitionConfig}`
  },
  closedDrawer: {
    width: closedDrawerWidth,
  },
  closedDrawerPaper: {
    width: closedDrawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transition: `width ${transitionConfig}`
  },
  drawerContainer: {
    overflow: 'auto',
  },
  divider: {
    backgroundColor: theme.palette.primary.light
  },
  sideLink: {
    color: theme.palette.text.white.inActive,
    "&:hover": {
      color: theme.palette.text.white.hover
    }
  },
  activeSideLink: {
    color: theme.palette.text.white.active,
    "&:hover": {
      color: theme.palette.text.white.active
    }
  }
}));
