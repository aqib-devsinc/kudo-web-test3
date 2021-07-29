import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  input: { minWidth: 'auto' },
  minUsersHeight: { minHeight: '55px' },
  root: {
    backgroundColor: 'transparent',
    indicator: { backgroundColor: 'white' },
  },
  tab: {
    fontWeight: 600,
    '&.Mui-selected': {
      borderRadius: '10px',
      backgroundColor: '#F2F2F2',
    },
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      display: 'inline',
    },
  },
  projectsScrollWrapper: {
    height: 700,
    overflow: 'auto',
  },
  sideBar: {
    minWidth: '15%',
    maxWidth: '15%',
    minHeight: '100vh',
    backgroundColor: 'white',
    marginBottom: '-70px',
  },
  projectsDiv: {
    height: '80vh',
    overflowY: 'scroll',
  },
  displaySideBar: {
    [theme.breakpoints.down('md')]: { display: 'none !important' },
    [theme.breakpoints.down('lg')]: { display: 'block' },
  },
  displayProjectsMenu: {
    [theme.breakpoints.up('md')]: { display: 'block' },
    [theme.breakpoints.up('lg')]: { display: 'none !important' },
  },
  projectNameHeight: { minHeight: '10vh' },
}));
