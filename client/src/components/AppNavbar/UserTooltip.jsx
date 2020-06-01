import React from "react";
import PropTypes from "prop-types";
import {
  Tooltip,
  IconButton,
  Badge
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const propTypes = {
  messagesAmount: PropTypes.number,
  notificationsAmount: PropTypes.number
}

const defaultProps = {
  messagesAmount: 0,
  notificationsAmount: 0
}

const UserTooltip = props => {
  const {
    messagesAmount,
    notificationsAmount
  } = props;

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
    </>
  );
}

UserTooltip.propTypes = propTypes;
UserTooltip.defaultProps = defaultProps;

export default UserTooltip;
