import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  Form,
  FormControl
} from "react-bootstrap";
import { NavLink } from "redux-first-router-link";

const defaultProps = {
  Pages: {
    default: {
      name: "default",
      component: Nav
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

  return (
    <Navbar>
      <Navbar.Brand href="/main/home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        {_.map(Pages, (pageData, key) =>
          <NavLink
            isActive={() => key === pageKey}
            className="nav-link"
            key={key}
            to={setPage(key)}
          >
            {pageData.name}
          </NavLink>
        )}
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
    </Navbar>
  );
}

AppNavbar.propTypes = propTypes;
AppNavbar.defaultProps = defaultProps;

export default AppNavbar;
