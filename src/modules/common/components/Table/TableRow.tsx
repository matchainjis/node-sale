import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  className?: string;
  children: ReactNode;
}

export function TableRow({ children, className }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return <tr className={cx(classes.root, className)}>{children}</tr>;
}

const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexFlow: 'column nowrap',
      gap: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 4.5),
      borderRadius: 16,
    },
  },
}));
