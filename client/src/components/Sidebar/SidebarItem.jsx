import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Icon,
  Box
} from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';

const propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  closed: PropTypes.bool,
  routeName: PropTypes.string
}

const defaultProps = {
  icon: BlockIcon,
  text: "",
  closed: false
}

const SidebarItem = props => {
  const {
    icon,
    text,
    closed
  } = props;

  const IconComponent = icon;

  return (
    <Box mt={2} mb={2} ml="auto" mr="auto">
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Icon fontSize="large">
          <IconComponent fontSize="large"/>
        </Icon>
        <Box mt={1}/>
        <Typography align="center" variant="subtitle2">
          {closed ? "" : text}
        </Typography>
      </Grid>
    </Box>
  );
}

SidebarItem.propTypes = propTypes;
SidebarItem.defaultProps = defaultProps;

export default SidebarItem;
