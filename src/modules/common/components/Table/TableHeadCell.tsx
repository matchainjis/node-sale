import { ReactNode, TdHTMLAttributes } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

interface Props extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableHeadCell({
  children,
  align = 'left',
  className,
  ...props
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <td align={align} className={cx(classes.root, className)} {...props}>
      <Typography
        paragraph
        className={classes.cellContent}
        variant="body1"
        width="max-content"
      >
        {children}
      </Typography>
    </td>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(0, 2, 1.5),

    '&:first-of-type': {
      paddingLeft: theme.spacing(4.5),
    },

    '&:last-of-type': {
      paddingRight: theme.spacing(4.5),
    },

    [theme.breakpoints.down('md')]: {
      padding: 0,

      '&:first-of-type': {
        paddingLeft: 0,
      },

      '&:last-of-type': {
        paddingRight: 0,
      },
    },
  },

  cellContent: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
      margin: 0,
      fontSize: 10,
      fontWeight: 500,
    },
  },
}));
