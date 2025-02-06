import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(2),

    height: 54,
    borderRadius: 16,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,

    '&&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.default,
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  icon: {
    width: 20,
  },
}));
