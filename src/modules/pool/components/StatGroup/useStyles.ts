import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  stats: {
    display: 'flex',
    gap: theme.spacing(4.5),
  },

  rank: {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: theme.spacing(1),
  },

  columnDivider: {
    width: 2,
    height: 50,
    borderRadius: 2,
    background: alpha(theme.palette.common.white, 0.05),
  },
}));
