import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 54,
    padding: theme.spacing(0, 4.5),

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0, 3),
    },
  },

  logoLink: {
    display: 'flex',
  },

  logo: {
    width: 198,

    [theme.breakpoints.down('md')]: {
      width: 154,
    },
  },
}));
