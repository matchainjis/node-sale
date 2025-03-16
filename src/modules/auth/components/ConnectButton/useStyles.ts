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
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    transition: 'all 0.2s ease',

    '&&:hover': {
      border: `1px solid ${theme.palette.divider}`,
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
