import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableRow,
  Box,
  Collapse,
 } from '@material-ui/core';

import ColumnResizer from "./ColumnResizer";
import useStyles from "./style";

const propTypes = {
  row: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.string,
  })),
  isCollapse: PropTypes.bool,
  headerRefs: PropTypes.array,
};

const defaultProps = {
  row: [],
  columns: [],
  isCollapse: false,
  headerRefs: [],
};


const Row = props => {
  const { row, columns, isCollapse, headerRefs, children } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const CustomTableCell = props => <TableCell className={classes.tabelCell} align="left" {...props}/>

  return (
    <>
      <TableRow hover className={classes.tableRow} onClick={() => setOpen(!open)}>
        {columns.map((column, index) => {
          const value = row[column.id];
          return (
            <Fragment key={column.id}>
              <CustomTableCell>
                { value }
              </CustomTableCell>
              {
                index + 1 < columns.length
                ? <ColumnResizer style={{padding: "0.5px"}} prev={headerRefs[index]} next={headerRefs[index+1]}/>
                : <></>
              }
            </Fragment>
          )
        })}
      </TableRow>
      { isCollapse
        ? <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        : <></>
      }
    </>
  )
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
