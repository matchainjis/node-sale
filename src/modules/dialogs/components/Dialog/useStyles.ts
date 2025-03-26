import { backdropClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    [`.${backdropClasses.root}`]: {
      background: 'transparent',
      backdropFilter: 'blur(10px)',
    },
  },

  paper: {
    width: '100%',
    maxWidth: 484,
    padding: theme.spacing(4.5, 6),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4.5, 3),
      margin: theme.spacing(0, 4),
    },
  },

  button: {
    position: 'absolute',
    cursor: 'pointer',
    top: theme.spacing(5),
    right: theme.spacing(5),

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
