import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  field: {
    width: '100%',
  },

  input: {
    marginTop: theme.spacing(6),
  },

  content: {
    flex: 1,
  },

  control: {
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: alpha(theme.palette.divider, 0.05),
    borderRadius: 1,
    margin: theme.spacing(3, 0),

    [theme.breakpoints.down('md')]: {
      margin: 0,
      height: theme.spacing(4.5),
      backgroundColor: 'transparent',
    },
  },

  info: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(6),
  },

  label: {
    fontWeight: 600,
    minWidth: 116,

    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      marginBottom: theme.spacing(1.5),
    },
  },

  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },

  symbols: {
    position: 'absolute',
    right: 12,
    bottom: 10,
    fontSize: 10,
    fontWeight: 500,

    color: alpha(theme.palette.text.primary, 0.6),
  },
}));
