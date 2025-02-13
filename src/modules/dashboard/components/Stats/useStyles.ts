import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import statsImage from '../../assets/stats-bg.jpg';
import statsMobileImage from '../../assets/stats-bg-mobile.jpg';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  card: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    gridTemplateRows: '30px 1fr',
    justifyContent: 'space-between',

    padding: theme.spacing(4, 4.5),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 4.5, 4),
    },
  },

  myStakedCard: {
    width: '100%',
    flex: 1,
    minHeight: 150,

    backgroundImage: `url(${statsImage})`,
    backgroundSize: 'cover',

    '&:before': {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(${statsMobileImage})`,
      minHeight: 136,
    },
  },

  commonCard: {
    width: '100%',
    maxWidth: 320,
    minHeight: 150,

    [theme.breakpoints.down('md')]: {
      minHeight: 100,
      maxWidth: '100%',
    },
  },

  label: {
    fontWeight: 600,
    color: alpha(theme.palette.text.primary, 0.6),
    alignSelf: 'center',
  },

  amount: {
    gridRow: 2,
    gridColumn: '1 / span 2',
    alignSelf: 'flex-end',
  },

  link: {
    display: 'flex',
    width: 76,
    cursor: 'pointer',
    position: 'relative',

    '& > img': {
      width: '100%',
    },
  },
}));
