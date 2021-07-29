import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import {
  PROJECT_TYPES,
  ADMIN_PROJECTS_TABLE_HEADER,
  ADMIN_INTERPRETER_TABLE_HEADER,
  DATATABLE_TYPE,
} from 'constants/admin';
import {
  TableCell,
} from '@material-ui/core';
import InterpretersActions from '../Interpreters/InterpretersActions';

export default function DataTableCell({ row, value, dataTableType }) {
  const getCellData = useCallback(() => {
    if (value === ADMIN_PROJECTS_TABLE_HEADER.interpreterName.value) return row?.[value]?.full_name ?? '';

    if (value === ADMIN_INTERPRETER_TABLE_HEADER.interpreterName.value) {
      return <span className='text-primary'>{row?.full_name ?? ''}</span>;
    }

    if (Object.values(PROJECT_TYPES).findIndex((el) => el.value === row[value]) !== -1) {
      return (
        <div>
          <SVG src={Object.values(PROJECT_TYPES).find((el) => el.value === row[value]).logo} />
          <span className='ml-2 text-muted'>
            {Object.values(PROJECT_TYPES).find((el) => el.value === row[value]).title}
          </span>
        </div>
      )
    }

    if (value === ADMIN_PROJECTS_TABLE_HEADER.status.value) {
      return (
        <span
          className={`${row[value] === 'Inactive' ? 'text-danger' : 'text-success'} pr-3 pl-3 py-1`}
          style={
            {
              backgroundColor: `${row[value] === 'Inactive' ? '#FFE2E5' : '#C9F7F5'}`,
              fontSize: '12px',
              borderRadius: '6px',
            }
          }
        >
          { row[value] }
        </span>
      )
    }

    if (value === ADMIN_PROJECTS_TABLE_HEADER.languages.value) {
      if (dataTableType === DATATABLE_TYPE.interpreter) {
        return (
          row[value].map((lang, langIndex) => (
            <span className='ml-1'>{`${lang?.toUpperCase()} ${langIndex !== row[value].length - 1 ? ',' : ''}`}</span>
          ))
        )
      }
      return (
        <div>
          <div>
            <span className='text-muted'>
              Source
            </span>
            <span className='ml-2'>
              {
                row[value].primary_language?.toUpperCase() ?? ''
              }
            </span>
          </div>
          <div className='mt-2'>
            <span className='ml-1 text-muted'>
              Target
            </span>
            {
              row[value].secondary_languages?.map((lang, langIndex) => (
                <span className='ml-2'>
                  {
                    `${lang.toUpperCase()} ${
                    langIndex !== row[value].secondary_languages.length - 1 ? ',' : ''
                    }`
                  }
                </span>
              ))
            }
          </div>
        </div>
      )
    }

    if (value === ADMIN_INTERPRETER_TABLE_HEADER.action.value) {
      return (
        <InterpretersActions
          interpreter={
            {
              id: row.id,
              name: row.full_name,
              roles: row.roles,
            }
          }
        />
      )
    }

    if (value === ADMIN_INTERPRETER_TABLE_HEADER.roles.value) {
      return (
        row[value].map((role, roleIndex) => (
          <span>{`${role} ${row[value].length - 1 !== roleIndex ? ',' : ''}`}</span>
        ))
      )
    }

    return row[value];
  }, [row, value, dataTableType]);

  return (
    <TableCell>
      {getCellData()}
    </TableCell>
  )
}

DataTableCell.propTypes = {
  row: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  dataTableType: PropTypes.string.isRequired,
};
