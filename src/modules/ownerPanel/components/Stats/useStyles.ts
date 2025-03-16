import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    flex: 1,
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto',
    },
  },

  tvlStat: {
    gridColumn: '1 / span 2',

    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / span 1',
      minHeight: 134,
    },
  },

  multiStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',

    [theme.breakpoints.down('md')]: {
      gridColumn: '1 / span 1',
      minHeight: 183,
    },
  },

  topSubStat: {
    display: 'flex',
    gridColumn: '1 / span 2',
  },

  subStat: {
    paddingTop: theme.spacing(8),
    justifyContent: 'flex-start',
    borderTop: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,

    '&:not(:last-child)': {
      borderRight: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
    },
  },

  subItem: {
    gridColumn: '1 / span 2',
    textAlign: 'center',
  },
}));
