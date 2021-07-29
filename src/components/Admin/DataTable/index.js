import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { useStyles } from 'styles/admin';
import { SORTING_DIRECTION } from 'constants/admin';
import ProjectsTablePagination from './DataTablePagination';
import DataTableRow from './DataTableRow';

function DataTable({
  headings,
  data,
  handlePageChange,
  handlePerPageChange,
  totalRows,
  page,
  totalPages,
  perPage,
  dataTableType,
  orderBy,
  order,
  handleSortChange,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.tableWrapper}>
        <Table size='small' className={`${classes.table} px-10`}>
          <TableHead>
            <TableRow>
              {
                Object.values(headings).map((head) => (
                  head.checked ? (
                    <TableCell
                      key={head.value}
                      className={classes.cellBorder}
                      data-lang={head.value}
                    >
                      { head.sortable ? (
                        <TableSortLabel
                          active={orderBy === head.value}
                          direction={orderBy === head.value ? order : SORTING_DIRECTION.asc}
                          onClick={handleSortChange.bind(this, head.sortOn)}
                          hideSortIcon
                        >
                          { head.label }
                        </TableSortLabel>
                      ) : head.label }
                    </TableCell>
                  ) : <TableCell />
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <DataTableRow headings={headings} data={data} dataTableType={dataTableType} />
          </TableBody>
        </Table>
      </div>
      <ProjectsTablePagination
        page={page}
        totalRows={totalRows}
        totalPages={totalPages}
        perPage={perPage}
        perPageOptions={[10, 20, 50, 100]}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </>
  );
}
export default (DataTable);

DataTable.propTypes = {
  headings: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePerPageChange: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  dataTableType: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};
