import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Divider,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";

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
  const classes = useStyle();

  useEffect(() => {
    setTab(_.keys(views).indexOf(viewKey));
  }, [viewKey]);

  return (
    <Toolbar variant="dense" className={classes.toolbar}>
      <Tabs
        value={tab}
        indicatorColor="primary"
      >
        {_.map(views, (viewData, key) =>
          <Tab
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
