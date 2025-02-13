import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

export interface TableCellProps {
  children?: ReactNode;
  className?: string;
  mdLabel?: ReactNode;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom' | 'baseline';
}

export function TableCell({
  children,
  className,
  mdLabel,
  align,
  valign = 'middle',
}: TableCellProps): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <td className={cx(classes.root, className)} valign={valign}>
      {mdLabel && (
        <Typography className={classes.label} component="div" variant="body1">
          {mdLabel}
        </Typography>
      )}

      <Typography
        className={cx(
          classes.cellContent,
          { [classes.fullWidth]: !mdLabel },
          align && {
            [classes[align]]: true,
            [classes.content]: true,
          },
        )}
        component="div"
        fontWeight={600}
        variant="body1"
      >
        {children}
      </Typography>
    </td>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3, 3.5),
    backgroundColor: theme.palette.background.paper,

    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    },

    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },

    [theme.breakpoints.down('md')]: {
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
  },
  label: {
    display: 'none',
    color: theme.palette.grey[600],
    fontSize: 10,

    [theme.breakpoints.down('md')]: {
      display: 'inline-flex',
    },
  },
  content: {
    display: 'flex',
  },
  cellContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  left: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
  fullWidth: {
    flex: 1,
  },
}));
