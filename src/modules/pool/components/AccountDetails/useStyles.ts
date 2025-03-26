import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    '&&': {
      padding: 0,
    },
  },

  table: {
    padding: theme.spacing(6),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 4.5),
    },
  },
}));
