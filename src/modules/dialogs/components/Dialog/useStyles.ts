import { alpha, backdropClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    [`.${backdropClasses.root}`]: {
      backdropFilter: 'blur(45px)',
    },
  },

  paper: {
    width: '100%',
    maxWidth: 700,
    padding: theme.spacing(7.5),

    boxShadow: `0px 5px 25px 0px ${alpha(
      theme.palette.grey[900],
      0.1,
    )}, 0px 10px 50px 0px ${alpha(theme.palette.grey[900], 0.1)}`,
  },

  button: {
    position: 'absolute',
    top: theme.spacing(6),
    right: theme.spacing(6),

    backgroundColor: theme.palette.background.default,
  },
}));
