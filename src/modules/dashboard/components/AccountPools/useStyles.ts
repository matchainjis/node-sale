import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 2, 2),
    },
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4.5),
  },

  tab: {
    cursor: 'pointer',
    color: alpha(theme.palette.text.primary, 0.6),
    transition: 'color 0.3s',
    textTransform: 'uppercase',
  },

  activeTab: {
    color: theme.palette.text.primary,
  },

  withdrawals: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
  },

  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4.5),
  },
}));
