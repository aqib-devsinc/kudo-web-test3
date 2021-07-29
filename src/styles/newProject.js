import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  step: { fontWeight: 700 },
  name: { '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { border: '1px solid #f44336' } },
  projectCard: {
    border: '1px solid #E5EAEE !important',
    cursor: 'pointer',
    color: '#B5B5C3',
    '&.focused': {
      backgroundColor: '#3699FF',
      color: '#fff',
    },
  },
  cardContentWrapper: { padding: '35px 10px' },
  label: { fontWeight: 400 },
  autocompleteInput: {
    '& .MuiInputBase-formControl': {
      backgroundColor: '#F3F6F9 !important',
      minWidth: '24rem',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'transparent',
      borderRadius: '4px',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { border: '1px solid #f44336' },
  },
  autocompleteInputError: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #f44336',
      '&:focus': { border: '1px solid #f44336' },
    },
  },
  keywordsError: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #f44336',
      '&:focus': { border: '1px solid #f44336' },
    },
  },
  description: {
    width: '100%',
    borderRadius: '4px',
    backgroundColor: '#F3F6F9',
    border: 'transparent',
    outline: 'none !important',
    '&::placeholder': { color: '#B5B5C3' },
  },
  dropzone: {
    minHeight: '15rem',
    border: '2px solid #3F4254',
    borderRadius: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:focus': {
      border: '2px solid #B5B5C3',
      borderRadius: '12px',
    },
  },
  cursorCopy: { cursor: 'copy' },
  hrML: { marginLeft: '25rem' },
  tagInput: { '&::placeholder': { color: '#B5B5C3' } },
  chipInput: {
    borderRadius: '4px',
    '& > div > div': { backgroundColor: '#F3F6F9' },
    '& .MuiFormHelperText-root': { marginBottom: '10px' },
    '& .MuiChip-root': {
      backgroundColor: '#3699FF',
      color: '#fff',
      '& .MuiChip-deleteIcon': { color: '#fff' },
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'transparent' },
    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #f44336',
      '&:focus': { border: '1px solid #f44336' },
    },
  },
  docPreview: {
    minWidth: theme.spacing(5),
    border: '2px solid #B5B5C3',
    borderRadius: '4px',
    '& img': { height: theme.spacing(8) },
  },
  cursorPointer: { cursor: 'pointer' },
  modalWrapper: { padding: `${theme.spacing(3)}px ${theme.spacing(5)}px` },
  errorBorder: { border: '1px solid #f44336' },
  wordBreak: { wordBreak: 'break-word' },
  widthAuto: { minWidth: 'auto !important' },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
  },
}));
