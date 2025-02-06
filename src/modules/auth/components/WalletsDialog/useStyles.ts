import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  paper: {
    width: '100%',
    maxWidth: 480,
  },
  wallets: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    marginTop: theme.spacing(7.5),
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(2),
  },
  icon: {
    width: 28,
  },
}));
