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
  Tab
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NavLink } from "redux-first-router-link";

const defaultProps = {
  Pages: {
    default: {
      name: "default",
      component: AppBar
    }
  },
  pageKey: "default",
};

const propTypes = {
  Pages: PropTypes.object,
  setPage: PropTypes.func,
  pageKey: PropTypes.string,
};

const AppNavbar = props => {
  const {
    Pages,
    pageKey,
    setPage
  } = props;

  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(_.indexOf(_.keys(Pages), pageKey));
  }, [pageKey]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className="ml-4 mr-4" variant="h5" color="inherit">
          ביטוח
        </Typography>
        <Tabs value={tab}>
          {_.map(Pages, (pageData, key) =>
            <Tab
              className="text-white"
              label={pageData.name}
              component={NavLink}
              to={setPage(key)}
              key={key}
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
