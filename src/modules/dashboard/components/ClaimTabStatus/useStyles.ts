import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),

    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(2),
    },
  },
  row: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      justifyContent: 'space-between',

      '& > td': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
}));
