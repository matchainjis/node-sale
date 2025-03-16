import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  icon: {
    width: 90,
    height: 90,
    overflow: 'hidden',
  },

  image: {
    objectFit: 'cover',
    width: '100%',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4.5),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(3),
    },
  },

  stats: {
    marginTop: theme.spacing(6),
    width: 'max-content',
  },

  divider: {
    width: 2,
    borderRadius: 2,
    background: alpha(theme.palette.common.white, 0.05),
    margin: theme.spacing(0, 7),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 2,
      margin: theme.spacing(6, 0, 4.5),
    },
  },

  rows: {
    flex: 1,
    marginTop: theme.spacing(6),
  },
}));
