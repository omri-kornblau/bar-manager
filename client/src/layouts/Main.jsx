import _ from "lodash";
import React from "react";
import { connect } from 'react-redux'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";

import Pages from "../pages";

import { getPage } from "../selectors/NavbarSelectors";
import { setPage } from "../actions/NavbarActions";

const Main = props => {
  const {
    page,
    setPage
  } = props;

  if (!Pages[page]) {
    console.error(`[Fatal] No such page as ${page}`);
  }

  const Page = Pages[page].component;

  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          {
            Object.keys(Pages).map(key =>
              <Nav.Link onClick={() => setPage(key)}>
                {Pages[key].name}
              </Nav.Link>
            )
          }
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar>
      <Page/>
    </>
  )
}

const mapStateToProps = state => ({
  page: getPage(state)
})

const mapDispatchToProps = dispatch => ({
  setPage: _.flow(setPage, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
