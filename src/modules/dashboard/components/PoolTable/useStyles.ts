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

  rightCell: {
    justifyContent: 'right',
  },
  row: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '230px 118px 200px 108px 140px 200px 1fr',
      justifyContent: 'space-between',

      '& > td': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
}));
