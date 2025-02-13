import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {},
  poolCell: {
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(5.5),
    },
  },
  commonMdCell: {
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.background.paper}`,
    },
  },
  actions: {
    paddingTop: theme.spacing(4),
  },
}));
