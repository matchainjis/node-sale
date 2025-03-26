import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(4.5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  rows: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },

  button: {
    minWidth: 180,
  },
}));
