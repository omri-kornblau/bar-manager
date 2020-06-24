import _ from "lodash";
import React, { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
 } from "@material-ui/core";

import ColumnResizer from "./ColumnResizer";
import TableHeaderCell from "./TableHeaderCell";
import Row from "./Row";
import useStyles from "./style";
import { useMemo } from "react";
import { useState } from "react";

const propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  isFilter: PropTypes.bool,
  isCollapse: PropTypes.element,
  isRounded: PropTypes.bool,
  isPagination: PropTypes.bool
};

const defaultProps = {
  rows: [[]],
  columns: [],
  isFilter: false,
  collapse: null,
  isPagination: true
};

const CustomTable = props => {
  const {
    rows,
    columns,
    isFilter,
    collapse,
    isRounded,
    isPagination,
    onRowClick,
    isSort,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState({id: "", direction: true});
  const [options, setOptions] = isFilter
    ? useState(
        columns.reduce((pre, column) => {
          switch (column.filter.type) {
            case "text":
              const uniqeRows = _.uniq(rows.map(row => row[column.id]));
              const options = uniqeRows.reduce((prev, cur) => (
                {[cur]: true, ...prev}
              ), {});

              return {...pre, [column.id]: {options, search: ""}};

            case "number":
              return {...pre, [column.id]: {min: null, max: null}};

            case "date":
              return {...pre, [column.id]: {min: null, max: null}};

            case "bool":
              return {...pre, [column.id]: null};

          }
        }, {})
      )
      : [[], () => {}];

  const finalRows = useMemo(() => {
    const filteredRows = isFilter ?
      rows.filter(row => (
          columns.every(column => {
            const value = row[column.id];
            const currentOptions = options[column.id];

            switch (column.filter.type) {
              case "text":
                return value.toString().includes(currentOptions.search) && !!currentOptions.options[value];

              case "number":
                const { min, max } = currentOptions;
                return (min === null || min < value) && (max === null || max > value);

              case "bool":
                return currentOptions === null || currentOptions === value;
            }
          })
      ))
      : rows;

    if (isSort && sortBy.id !== "") {
      filteredRows.sort((a, b) => {
        const _a = a[sortBy.id]
        const _b = b[sortBy.id]
        if (_a > _b) {
          return sortBy.direction ? 1 : -1;
        } else if (_a < _b) {
          return sortBy.direction ? -11 : 1;
        } else {
          return 0
        }
      });
    }

    return filteredRows;
  }, [options, isFilter, isSort, sortBy]);

  const headerRefs = columns.map(() => useRef(null));

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderLabelDisplayedRows = ({from, to, count}) => {
    return `${from}-${to} מתוך ${count}`;
  };

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.table}>
      <TableContainer className={`${classes.table} ${isRounded ? classes.roundedTable : ""}`}>
        <Table stickyHeader className={classes.tableBody} size="small">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              {
                columns.map((column, index) => {
                  return (
                    <Fragment key={column.id}>
                      <TableHeaderCell
                        ref={headerRefs[index]}
                        column={column}
                        isFilter={isFilter}
                        options={options[column.id]}
                        setOptions={newOptions => setOptions({...options, [column.id]: newOptions})}
                        setSortBy={() => setSortBy(
                          sortBy.id === column.id ?
                          {...sortBy, direction: !sortBy.direction}
                          : {id: column.id, direction: true}
                        )}
                      />
                      {
                        index + 1 < columns.length
                        ? <ColumnResizer style={{padding: "0.5px"}}/>
                        : <></>
                      }
                    </Fragment>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {finalRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) =>
              <Row
                row={row}
                columns={columns}
                key={index}
                collapse={collapse}
                headerRefs={headerRefs}
                isRounded={isRounded}
                onRowClick={onRowClick}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      { isPagination ?
       <TablePagination
        rowsPerPageOptions={[5,10,25,100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        labelDisplayedRows={renderLabelDisplayedRows}
        labelRowsPerPage="שורות בכל עמוד:"
        />
        : ""
      }

    </Paper>
  );
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;

export default CustomTable;
