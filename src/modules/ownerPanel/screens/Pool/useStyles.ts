import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    gap: theme.spacing(4.5),

    minHeight: 569,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
      minHeight: 'auto',
    },
  },

  details: {
    maxWidth: 397,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
}));
