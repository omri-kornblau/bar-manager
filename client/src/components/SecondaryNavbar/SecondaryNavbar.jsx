import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Toolbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import newRequestViews from "../../containers/mainViews/homeViews/clientViews/newRequestViews";

import useStyle from "./style";

const propTypes = {
  viewKey: PropTypes.string,
  views: PropTypes.object,
};

const SecondaryNavbar = props => {
  const {
    viewKey,
    views,
    getProgress,
  } = props;

  const [tab, setTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const classes = useStyle();

  useEffect(() => {
    setTab(Math.max(0, _.keys(views).indexOf(viewKey)));
  }, [viewKey]);

  const onNewRequestClick = e => {
    setMenuAnchorEl(e.currentTarget);
  }

  const onCloseNewRequestMenu = () => {
    setMenuAnchorEl(null);
  }

  const newRequestKey = "newrequest";

  return (
    <Toolbar className={classes.toolbar}>
      <Tabs
        value={tab}
        indicatorColor="primary"
      >
        {_.map(views, (viewData, key) =>
          key === newRequestKey ?
            <Tab
              label={viewData.name}
              icon={<viewData.icon/>}
              onClick={onNewRequestClick}
              key={key}
            />
            : <Tab
              label={viewData.name}
              component={Link}
              to={`/home/${key}/${getProgress(key)}`}
              icon={<viewData.icon/>}
              key={key}
            />
        )}
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={!!menuAnchorEl}
        onClose={onCloseNewRequestMenu}
      >
        {_.map(newRequestViews, viewData =>
          <Link key={viewData.id} to={`/home/${newRequestKey}/${viewData.id}`}>
            <MenuItem onClick={onCloseNewRequestMenu}>{viewData.label} {viewData.icon}</MenuItem>
          </Link>
        )}
      </Menu>
    </Toolbar>
  );
}

SecondaryNavbar.propTypes = propTypes;

export default SecondaryNavbar;
