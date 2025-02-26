import { CSSProperties, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function TableRow({ children, className, style }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <tr className={cx(classes.root, className)} style={style}>
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
}));
