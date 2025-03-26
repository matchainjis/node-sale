import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import introImage from '../../assets/intro-bg.jpg';
import introMobileImage from '../../assets/intro-bg-mobile.jpg';

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(6),

    minHeight: 238,
    backgroundImage: `url(${introImage})`,
    backgroundSize: 'cover',
    padding: theme.spacing(7.5),

    '&:before': {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      minHeight: 256,
      backgroundImage: `url(${introMobileImage})`,
      padding: theme.spacing(3, 4),
    },
  },

  title: {
    maxWidth: 600,
    fontWeight: 400,
    textTransform: 'uppercase',

    [theme.breakpoints.down('md')]: {
      maxWidth: 400,
    },
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: theme.spacing(7.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4.5),

    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(3),
    },
  },

  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },

  divider: {
    width: 2,
    borderRadius: 18,
    height: 45,
    backgroundColor: alpha(theme.palette.common.white, 0.3),

    [theme.breakpoints.down('md')]: {
      height: 38,
    },
  },

  label: {
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },

  button: {
    maxWidth: 180,

    [theme.breakpoints.down('md')]: {
      maxWidth: 500,
    },
  },
}));
