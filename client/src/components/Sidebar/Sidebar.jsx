import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Divider,
  Toolbar,
  List,
  ListItem,
  Grid,
  IconButton,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SidebarItem from "./SidebarItem";

import useStyles from "./style";
import { Link } from "react-router-dom";

const propTypes = {
  closed: PropTypes.bool,
  viewKey: PropTypes.string,
  views: PropTypes.object,
  onCloseClick: PropTypes.func
};

const defaultProps = {
  closed: false,
  onCloseClick: _.noop
};

const Sidebar = props => {
  const {
    closed,
    onCloseClick,
    viewKey,
    views
  } = props;

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={closed ? classes.closedDrawerPaper: classes.drawerPaper}
      classes={{
        paper: closed ? classes.closedDrawerPaper : classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {_.map(views, (viewData, key) => (
            <Link key={key} to={`/home/${key}`}>
              <ListItem className={key === viewKey ? classes.activeSideLink : classes.sideLink} button>
                <SidebarItem
                  closed={closed}
                  icon={viewData.icon}
                  text={viewData.name}
                />
              </ListItem>
              <Divider className={classes.divider} variant="middle"/>
            </Link>
          ))}
        </List>
        <Grid container justify="center">
          <IconButton className="text-white" onClick={() => onCloseClick(closed)}>
            {closed ?
              <ChevronLeftIcon/> :
              <ChevronRightIcon color="inherit"/>
            }
          </IconButton>
        </Grid>
      </div>
    </Drawer>
  );
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
