import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  logoWrapper: {
    width: 48,
    height: 48,
    padding: 2,
    borderRadius: '50%',
    boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.15)}`,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
  },

  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 15,
    padding: theme.spacing(0, 4.5),
    boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.15)}`,
    backgroundColor: 'transparent',
    transition: '0.2s',
    cursor: 'pointer',

    '&:hover': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.text.primary, 0.15)}`,
    },
  },

  closeButton: {
    padding: 0,
    width: 42,
  },

  hiddenInput: {
    display: 'none',
  },
}));
