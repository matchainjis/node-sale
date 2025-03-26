import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  wallets: {
    display: 'flex',
    gap: theme.spacing(3.5),
    marginTop: theme.spacing(4.5),
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
