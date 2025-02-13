import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  children: ReactNode;
}

export function TableBody({ children }: Props): JSX.Element {
  const { classes } = useStyles();

  return <tbody className={classes.root}>{children}</tbody>;
}

const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexFlow: 'column nowrap',
      gap: theme.spacing(2),
    },
  },
}));
