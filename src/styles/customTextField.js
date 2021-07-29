import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  select: {
    '& .MuiSelect-select': {
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'transparent' },
    '& .Mui-error .MuiOutlinedInput-notchedOutline': { border: '1px solid #f44336' },
  },
  inputStyles: {
    backgroundColor: '#F3F6F9',
    minWidth: '20rem',
    borderRadius: '4px',
    '&:focus': { borderRadius: '4px' },
  },
  selectInputStyles: {
    backgroundColor: '#F3F6F9',
    minWidth: '5rem',
    borderRadius: '4px',
    '&:focus': { borderRadius: '4px' },
  },
  selectPlaceholder: { color: '#B5B5C3' },
});
