import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <tr
      className={cx(classes.root, !!onClick && classes.clickable, className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
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
  clickable: {
    cursor: 'pointer',
  },
}));
