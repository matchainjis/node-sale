import { ReactNode, TdHTMLAttributes } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

interface Props extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableHeadCell({
  children,
  align = 'left',
  ...props
}: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <td align={align} className={classes.root} {...props}>
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
    padding: theme.spacing(0, 3.5, 1.5),
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
