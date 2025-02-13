import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(18.5, 0, 23.5),
    flex: 1,
  },
  image: {
    width: '100%',
    maxWidth: 200,
  },
}));
