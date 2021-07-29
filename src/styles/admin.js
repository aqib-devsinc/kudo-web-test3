import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '24rem',
    minWidth: '14rem',
    borderRadius: '6px',
    backgroundColor: theme.palette.grey[100],
    '& .MuiInputBase-formControl': { paddingRight: 0 },
    '& .dropdown-toggle': {
      backgroundColor: `${theme.palette.grey[300]} !important`,
      borderRadius: '0 6px 6px 0',
      color: `${theme.palette.grey[700]} !important`,
      '&::after': { color: `${theme.palette.grey[700]} !important` },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'transparent',
      '&:focus': { border: 'transparent' },
    },
  },
  searchIcon: { color: theme.palette.grey[400] },
  tableWrapper: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
    // border: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiTableCell-root': {
      fontSize: '14px',
      height: '43px',
    },
    '& thead .MuiTableCell-root': {
      fontSize: 14,
      color: '#B5B5C3 !important',
    },
    '& tbody .MuiTableCell-root': {
      fontFamily: 'Poppins',
      paddingTop: '2px',
      paddingBottom: '2px',
    },
  },
  termDescriptionWrapper: {
    width: theme.spacing(100),
    marginLeft: '6rem',
  },
  row: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.grey[100] } },
  expandedRow: { backgroundColor: '#FFC8D2 !important' },
  subHeading: { color: theme.palette.grey[500] },
  destinationCol: { '& .MuiSelect-select': { minWidth: '8rem' } },
  addTermWrapper: {
    minHeight: theme.spacing(25),
    border: `1px dashed ${theme.palette.grey[500]}`,
    borderRadius: '6px',
  },
  dashedBorder: {
    border: `1px dashed ${theme.palette.grey[500]}`,
    borderRadius: '6px',
  },
  fileIconWrapper: { width: theme.spacing(5) },
  bgPrimary: { backgroundColor: 'var(--primary)' },
  perPageInput: { minWidth: '2rem !important' },
  paginationControl: {
    backgroundColor: '#F3F6F9',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  paginationCurrentPage: {
    backgroundColor: 'var(--primary)',
    padding: '3px',
    color: '#fff',
    minWidth: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'auto',
  },
  filteredColumnsList: {
    '& .MuiListItem-gutters': {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
    '& .MuiFormControlLabel-root': { margin: 0 },
    '& .MuiCheckbox-root': {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  },
  searchDropdownBtn: {
    backgroundColor: '#e0e0e0 !important',
    color: '#464E5F !important',
    borderRadius: '0 0.42rem 0.42rem 0',
  },
  searchDropdownMenu: {
    '& .MuiCheckbox-root': { padding: '5px' },
    '& .MuiListItem-root': {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  },
}));
