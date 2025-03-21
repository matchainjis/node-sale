import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),

    color: theme.palette.text.secondary,
  },
  icon: {
    minWidth: 18,
    maxWidth: 18,
    maxHeight: 18,
  },
}));
