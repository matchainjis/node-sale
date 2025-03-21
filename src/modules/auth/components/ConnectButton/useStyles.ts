import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',

    width: 136,
    height: 136,
    borderRadius: 16,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: `0 0 0 1px ${alpha(theme.palette.divider, 0.1)}`,

    '&&:hover': {
      boxShadow: `0 0 0 1px ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.7,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  icon: {
    width: 32,
  },
}));
