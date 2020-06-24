import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./style";

import gseLogo from "../../assets/img/gse-logo.svg"
import UserTooltip from "./UserTooltip";
import LoginTooltip from "./LoginTooltip";

const defaultProps = {
  pages: [],
  pageKey: "default",
  isLoggedIn: false
};

const propTypes = {
  pages: PropTypes.array,
  pageKey: PropTypes.string,
  isLoggedIn: PropTypes.bool
};

const AppNavbar = props => {
  const {
    pages,
    accountIconPages,
    pageKey,
    isLoggedIn,
    logout
  } = props;

  const [tab, setTab] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    setTab(_.findIndex(pages, { id: pageKey }));
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
          {_.map(pages, pageData =>
            <Tab
              label={pageData.name}
              component={Link}
              to={`/${pageData.id}`}
              key={pageData.id}
              disableRipple
            />
          )}
        </Tabs>
        <div className="mr-auto">
          { isLoggedIn
            ? <UserTooltip
                views={accountIconPages}
                view={pageKey}
                logout={logout}
              />
            : <LoginTooltip/>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = propTypes;
AppNavbar.defaultProps = defaultProps;

export default AppNavbar;
