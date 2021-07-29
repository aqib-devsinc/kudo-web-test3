import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  heading: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  silentText: { color: '#B5B5C3' },
  input: {
    '& .MuiOutlinedInput-root': { backgroundColor: '#F3F6F9' },
    '& .Mui-error .MuiOutlinedInput-notchedOutline': { border: 'transparent !important' },
  },
  lineSeparator: {
    borderRight: '1px solid #FFFFFF',
    paddingRight: '15px',
  },
});
