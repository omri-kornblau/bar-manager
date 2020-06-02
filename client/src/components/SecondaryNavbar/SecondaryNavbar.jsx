import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Divider,
  Toolbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { Link } from "react-router-dom";

import useStyle from "./style";

const propTypes = {
  viewKey: PropTypes.string,
  views: PropTypes.object,
};

const SecondaryNavbar = props => {
  const {
    viewKey,
    views
  } = props;

  const [tab, setTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const classes = useStyle();

  useEffect(() => {
    setTab(_.keys(views).indexOf(viewKey));
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
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={!!menuAnchorEl}
          onClose={onCloseNewRequestMenu}
        >
          <Link to={newRequestKey}>
            <MenuItem onClick={onCloseNewRequestMenu}>ביטוח א'</MenuItem>
            <MenuItem onClick={onCloseNewRequestMenu}>ביטוח ב'</MenuItem>
            <MenuItem onClick={onCloseNewRequestMenu}>ביטוח ג'</MenuItem>
          </Link>
        </Menu>
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
              to={`${key}`}
              icon={<viewData.icon/>}
              key={key}
            />
        )}
      </Tabs>
    </Toolbar>
  );
}

SecondaryNavbar.propTypes = propTypes;

export default SecondaryNavbar;
