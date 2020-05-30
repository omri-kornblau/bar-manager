import React, { useState, Fragment, cloneElement } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableRow,
  Collapse,
 } from '@material-ui/core';

import ColumnResizer from "./ColumnResizer";
import useStyles from "./style";

const propTypes = {
  row: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  collapse: PropTypes.element,
  headerRefs: PropTypes.array,
  isRounded: PropTypes.bool,
};

const defaultProps = {
  row: [],
  columns: [],
  collapse: null,
  headerRefs: [],
};

const Row = props => {
  const {
    row,
    columns,
    collapse,
    headerRefs,
    isRounded
  } = props;

  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const CustomTableCell = props => <TableCell className={classes.tabelCell} align="left" {...props}/>

  return (
    <>
      <TableRow hover className={isRounded ? classes.roundedTableRow : null} onClick={() => setOpen(!open)}>
        {columns.map((column, index) => {
          const value = row[column.id];
          return (
            <Fragment key={column.id}>
              <CustomTableCell>
                { value }
              </CustomTableCell>
              {
                index + 1 < columns.length
                ? <ColumnResizer style={{opacity: isRounded ? 0 : 1}} prev={headerRefs[index]} next={headerRefs[index+1]}/>
                : <></>
              }
            </Fragment>
          )
        })}
      </TableRow>
      { collapse
        ? <Collapse in={open} timeout="auto" unmountOnExit>
            <TableRow>
              <TableCell colSpan={columns.length}>
                {cloneElement(collapse, {row})}
              </TableCell>
            </TableRow>
          </Collapse>
        : <></>
      }
    </>
  )
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
