import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  className?: string;
  children: ReactNode;
}

export function TableBody({ className, children }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return <tbody className={cx(classes.root, className)}>{children}</tbody>;
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
