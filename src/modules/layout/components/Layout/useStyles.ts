import { makeStyles } from 'tss-react/mui';

import { HEADER_HEIGHT } from '../../consts';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    paddingBottom: theme.spacing(20),

    [theme.breakpoints.down('md')]: {
      paddingTop: `calc(${theme.spacing(4)} + ${HEADER_HEIGHT}px)`,
      paddingBottom: theme.spacing(7.5),
    },
  },

  content: {
    display: 'flex',

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(9),
    },
  },
}));
