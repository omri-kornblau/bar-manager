import React, { useState, Fragment, cloneElement } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableRow,
  Collapse,
  Box,
  Grid,
 } from '@material-ui/core';

import { applyFormat } from "../../helpers/formats";
import ColumnResizer from "./ColumnResizer";
import useStyles from "./style";

const propTypes = {
  row: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  collapse: PropTypes.element,
  headerRefs: PropTypes.array,
  rounded: PropTypes.bool,
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
    rounded,
    onRowClick,
    actions,
    drag,
  } = props;

  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const _onClick = (func) => {
    setOpen(!open);
    if (typeof(func) === "function") {
      func(row);
    }
  }

  return (
    <>
      <TableRow hover className={rounded ? classes.roundedTableRow : null}>
        {columns.map((column, index) => {
          const value = row[column.id];
          return (
            <Fragment key={column.id}>
              <TableCell
                className={rounded ? classes.roundedTableCell : classes.tabelCell}
                align="left"
                onClick={() => column.id === "actions" ? _onClick(() => {}) : _onClick(onRowClick)}
                {...props}
              >
                {applyFormat(column.id === "actions" ? actions : value, column.formatter, row)}
              </TableCell>
              {
                index + 1 < columns.length && !! drag
                ? <ColumnResizer
                    style={{ opacity: rounded ? 0 : 1 }}
                    prev={headerRefs[index]}
                    next={headerRefs[index+1]}
                  />
                : null
              }
            </Fragment>
          )
        })}
      </TableRow>
      {collapse ?
        <TableRow style={{ opacity: open ? 1 : 0 }}>
          <TableCell colSpan={columns.length} className={classes.collapseTableCell}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {cloneElement(collapse, {row})}
            </Collapse>
          </TableCell>
        </TableRow>
        : null
      }
    </>
  )
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
