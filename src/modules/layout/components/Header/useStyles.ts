import { makeStyles } from 'tss-react/mui';

import { HEADER_HEIGHT } from '../../consts';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

    height: HEADER_HEIGHT,
    padding: theme.spacing(0, 4.5),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 3),
    },
  },

  menuRoot: {
    height: '100vh',
    backdropFilter: 'blur(10px)',
    background: 'transparent',
  },

  logoLink: {
    display: 'flex',
  },

  logo: {
    width: 198,

    [theme.breakpoints.down('md')]: {
      width: 154,
    },
  },
}));
