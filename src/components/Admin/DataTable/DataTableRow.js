import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
} from '@material-ui/core';
import DataTableCell from './DataTableCell';

export default function DataTableRow({ headings, data, dataTableType }) {
  return (
    <>
      {
        data?.map((row) => (
          <TableRow>
            {
              Object.values(headings).map((el) => (
                el.checked ? (
                  <DataTableCell row={row} value={el.value} dataTableType={dataTableType} />
                ) : <TableCell />
              ))
            }
          </TableRow>
        ))
      }
    </>
  )
}

DataTableRow.defaultProps = { data: [] };

DataTableRow.propTypes = {
  headings: PropTypes.object.isRequired,
  data: PropTypes.array,
  dataTableType: PropTypes.string.isRequired,
};
