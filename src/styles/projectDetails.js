import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  searchInput: {
    minWidth: '34rem',
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
    border: `1px solid ${theme.palette.grey[300]}`,
    '& .MuiTableCell-root': {
      fontSize: '12px',
      height: '43px',
    },
    '& thead .MuiTableCell-root': { fontSize: 14 },
    '& tbody .MuiTableCell-root': {
      paddingTop: '2px',
      paddingBottom: '2px',
      wordBreak: 'break-word',
    },
  },
  termDescriptionWrapper: {
    width: theme.spacing(100),
    marginLeft: '6rem',
  },
  row: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.grey[100] } },
  expandedRow: { backgroundColor: '#FFC8D2 !important' },
  cellBorder: { borderRight: `1px solid ${theme.palette.grey[300]}` },
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
  termExtractorWrapper: {
    display: 'flex',
    overflow: 'auto',
    '& .extractor-card': { flex: '0 0 30rem' },
  },
  newTermIndicator: {
    height: '10px',
    width: '10px',
    backgroundColor: 'var(--primary)',
    borderRadius: '50%',
  },
  entitiesWrapper: {
    height: 200,
    overflow: 'hidden auto',
  },
  fileUploaded: { minHeight: 421 },
  projectKeywords: { minHeight: 200 },
  projectUrl: { minHeight: 100 },
  filesWrapper: {
    height: 210,
    overflow: 'hidden auto',
  },
  newTermTd: { width: 60 },
  termTd: { width: 120 },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
  },
  corpus: { maxHeight: '20vh' },
  subHeaderPadding: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0',
      paddingRight: '0',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '7',
      paddingRight: '7',
    },
  },
}));
