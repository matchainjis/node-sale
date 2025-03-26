import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  button: {
    width: '100%',
    maxWidth: 144,

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },

  timeLeftButton: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));
