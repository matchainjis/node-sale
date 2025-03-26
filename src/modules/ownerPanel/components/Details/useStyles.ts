import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  icon: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    overflow: 'hidden',
  },

  image: {
    objectFit: 'cover',
    width: '100%',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
    },
  },

  stats: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(7.5),
  },

  rows: {
    flex: 1,
    marginTop: theme.spacing(7.5),
  },
}));
