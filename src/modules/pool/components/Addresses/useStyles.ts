import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  rows: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,

    gap: theme.spacing(3),
    marginTop: theme.spacing(7.5),
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },

  rowValue: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },

  copyButton: {
    padding: 0,
    border: 'none',
    cursor: 'pointer',

    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: 600,

    background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },

  rowDivider: {
    width: '100%',
    height: 2,
    borderRadius: 2,
    background: alpha(theme.palette.common.white, 0.05),
  },
}));
