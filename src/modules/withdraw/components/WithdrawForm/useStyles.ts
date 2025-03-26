import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  input: {
    marginTop: theme.spacing(6),
  },

  content: {
    flex: 1,
  },

  infos: {
    flex: 1,
    marginTop: theme.spacing(4.5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },

  summary: {
    marginTop: theme.spacing(7),
  },
}));
