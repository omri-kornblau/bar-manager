import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import useStyles from "./style";

const defaultProps = {
  pages: {
    default: {
      name: "default",
      component: AppBar
    }
  },
  pageKey: "default",
};

const propTypes = {
  pages: PropTypes.object,
  pageKey: PropTypes.string,
};

const AppNavbar = props => {
  const {
    pages,
    pageKey
  } = props;

  const [tab, setTab] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    setTab(_.keys(pages).indexOf(pageKey));
  }, [pageKey]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className="ml-4 mr-4" variant="h5" color="inherit">
          ביטוח
        </Typography>
        <Tabs
          value={tab}
          indicatorColor="primary"
        >
          {_.map(pages, (pageData, key) =>
            <Tab
              label={pageData.name}
              component={Link}
              to={`/${key}`}
              key={key}
              disableRipple
            />
          )}
        </Tabs>
        <div className="mr-auto">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = propTypes;
AppNavbar.defaultProps = defaultProps;

export default AppNavbar;
