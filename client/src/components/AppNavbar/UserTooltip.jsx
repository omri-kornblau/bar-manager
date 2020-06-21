import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import useStyle from "./style";

const propTypes = {
  views: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    component: PropTypes.func,
    icon: PropTypes.func
  })),
  view: PropTypes.string
}

const defaultProps = {
  views: [],
  view: ""
}

const UserTooltip = props => {
  const {
    views,
    view,
    logout
  } = props;

  const [saveAnchorEl, setSaveAnchorEl] = useState(null);

  const classes = useStyle();

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={saveAnchorEl}
        open={Boolean(saveAnchorEl)}
        onClose={() => setSaveAnchorEl(null)}
      >
        {_.map(views, viewData =>
          <Link key={viewData.id} to={`/${viewData.id}`}>
            <MenuItem className={classes.darkLink}><viewData.icon/><Box mr={1}/>{viewData.name}</MenuItem>
          </Link>
        )}
        <MenuItem onClick={logout}>
          התנתק
        </MenuItem>
      </Menu>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={e => setSaveAnchorEl(e.currentTarget)}
      >
        <AccountCircleIcon />
      </IconButton>
    </>
  );
}

UserTooltip.propTypes = propTypes;
UserTooltip.defaultProps = defaultProps;

export default UserTooltip;
