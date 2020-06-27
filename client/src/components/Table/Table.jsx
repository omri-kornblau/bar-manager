import _ from "lodash";
import React, {
  useMemo,
  useState,
  useRef,
  Fragment
} from "react";
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
import TablePaginationActions from "./PagnitionActions";
import Row from "./Row";
import useStyles from "./style";
import {
  SORT_OPTIONS,
} from "./consts";

const propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  filter: PropTypes.bool,
  collapse: PropTypes.element,
  rounded: PropTypes.bool,
  pagination: PropTypes.bool
};

const defaultProps = {
  rows: [[]],
  columns: [],
  filter: false,
  collapse: null,
  pagination: true,
  onRowClick: _.noop,
};

const initOptions = (columns, rows) => {
  return columns.reduce((pre, column) => {
    if (column.filter === false) {
      return {...pre, [column.id]: {isActive: false}};
    }

    switch (_.isNil(column.filter) ? "" : column.filter.type) {
      case "":
      case "text":
        const uniqeRows = _.uniq(rows.map(row => row[column.id]));
        const options = uniqeRows.reduce((prev, cur) => (
          {[cur]: true, ...prev}
        ), {});

        return {...pre, [column.id]: {options, search: "", isActive: false}};

      case "number":
        return {...pre, [column.id]: {min: "", max: "", isActive: false}};

      case "date":
        return {...pre, [column.id]: {min: "", max: "", isActive: false}};

      case "bool":
        return {...pre, [column.id]: {value: null, isActive: false}};

    }
  }, {})
}

const CustomTable = props => {
  const {
    rows,
    columns,
    filter,
    collapse,
    rounded,
    pagination,
    onRowClick,
    sort,
    actions,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState({id: "", direction: true});
  const [options, setOptions] = useState(filter ? initOptions(columns, rows) : []);

  const finalRows = useMemo(() => {
    const filteredRows = filter ?
      rows.filter(row => (
          columns.every(column => {
            const value = row[column.id];
            const currentOptions = options[column.id];
            if (column.filter === false) {
              return true;
            }

            switch (_.isNil(column.filter) ? "" : column.filter.type) {
              case "":
              case "text":
                return value.toString().includes(currentOptions.search) && !!currentOptions.options[value];

              case "number":
                const { min, max } = currentOptions;
                return (min === "" || min < value) && (max === "" || max > value);

              case "bool":
                return _.isNil(currentOptions.value) || currentOptions.value === value;
            }
          })
      ))
      : rows;

    if (sort && sortBy.id !== "") {
      filteredRows.sort((a, b) => {
        const _a = a[sortBy.id]
        const _b = b[sortBy.id]
        if (_a > _b) {
          return sortBy.direction ? 1 : -1;
        } else if (_a < _b) {
          return sortBy.direction ? -1 : 1;
        } else {
          return 0
        }
      });
    }

    return filteredRows;
  }, [options, filter, sort, sortBy, rows]);

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
      <TableContainer className={`${classes.table} ${rounded ? classes.roundedTable : ""}`}>
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
                        filter={filter}
                        options={options[column.id]}
                        setOptions={newOptions => setOptions({...options, [column.id]: newOptions})}
                        setSortBy={
                          column.sort === false
                          ? () => {}
                          : () => setSortBy(
                              sortBy.id === column.id ?
                              {...sortBy, direction: !sortBy.direction}
                              : {id: column.id, direction: true}
                            )
                        }
                        sortDirection={
                          sortBy.id === column.id && column.sort !== false
                          ? sortBy.direction ? SORT_OPTIONS.UP : SORT_OPTIONS.DOWN
                          : SORT_OPTIONS.NONE
                        }
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
                rounded={rounded}
                onRowClick={onRowClick}
                actions={actions}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      { pagination ?
       <TablePagination
          rowsPerPageOptions={[5,10,25,100]}
          component="div"
          count={finalRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onRowsPerPageChange}
          labelDisplayedRows={renderLabelDisplayedRows}
          labelRowsPerPage="שורות בכל עמוד:"
          ActionsComponent={props =>
            <TablePaginationActions
              {...props}
              onClear={() => setOptions(initOptions(columns, rows))}
              clear={filter}
              clearDisabled={_.every(options, value => !value.isActive)}
            />
          }
        />
        : <></>
      }
    </Paper>
  );
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;

export default CustomTable;
