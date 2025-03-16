import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    width: '100%',
  },

  pool: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },

  icon: {
    width: 30,
    minWidth: 30,
    height: 30,
    overflow: 'hidden',
  },

  image: {
    objectFit: 'cover',
    width: '100%',
  },

  labels: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    color: alpha(theme.palette.text.primary, 0.6),
  },

  circle: {
    width: 2,
    height: 2,
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.text.primary, 0.6),
  },
}));
