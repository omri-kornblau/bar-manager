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
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import useStyles from "./style";

import gseLogo from "../../assets/img/gse-logo.svg"

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
      position="absolute"
      className={classes.appBar}
    >
      <Toolbar>
        <img alt="gse-logo" width={50} src={gseLogo}/>
        <Typography className="ml-4 mr-4" variant="h6" color="inherit">
          גיזה זינגר אבן
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
