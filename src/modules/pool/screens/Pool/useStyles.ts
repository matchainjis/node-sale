import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    position: 'absolute',
    left: -100,
    padding: theme.spacing(0, 4),

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 806,
    width: '100%',
    gap: theme.spacing(3),
  },
}));
