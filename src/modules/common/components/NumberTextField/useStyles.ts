import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  input: {
    fontSize: 36,
    lineHeight: '18px',
    padding: theme.spacing(15, 4.5, 4),
    height: 'auto',
    fontWeight: 600,
  },
}));
