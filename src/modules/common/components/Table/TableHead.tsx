import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  children: ReactNode;
}

export function TableHead({ children }: Props): JSX.Element {
  const { classes } = useStyles();

  return <thead className={classes.root}>{children}</thead>;
}

const useStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
