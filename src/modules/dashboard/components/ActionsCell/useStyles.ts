import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'flex-end',
    width: '100%',
  },

  button: {
    maxWidth: 144,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  squareButton: {
    '&&': {
      padding: 0,
      maxWidth: 36,
      minWidth: 36,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
        flex: 1,
      },
    },
  },
}));
