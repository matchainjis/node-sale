import { forwardRef, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  className?: string;
  children: ReactNode;
}

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(
  function TableBodyContent({ className, children }, ref) {
    const { classes, cx } = useStyles();

    return (
      <tbody ref={ref} className={cx(classes.root, className)}>
        {children}
      </tbody>
    );
  },
);

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
