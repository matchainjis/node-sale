import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 2, 2),
    },
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4.5),
  },
}));
