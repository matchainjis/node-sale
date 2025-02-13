import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { useTranslation } from 'modules/i18n';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeadCell } from './TableHeadCell';
import { TableRow } from './TableRow';
import { translation } from './translation';

interface Props {
  className?: string;
  children: ReactNode;
  loading?: boolean;
  isEmpty?: boolean;
}

export function Table({
  children,
  className,
  loading,
  isEmpty,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <div className={cx(classes.root, className)}>
      <table cellSpacing={0} className={classes.table}>
        {children}
      </table>

      {loading && (
        <Typography className={classes.label} fontWeight={600} variant="body1">
          {t(keys.loading)}
        </Typography>
      )}

      {!loading && isEmpty && (
        <Typography className={classes.label} fontWeight={600} variant="body1">
          {t(keys.empty)}
        </Typography>
      )}
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    overflowX: 'auto',
    background: 'transparent',
    border: `none`,

    '&::-webkit-scrollbar': {
      width: 6,
      height: 6,
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[700],
      borderRadius: 3,
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.grey[700],
    },
  },
  table: {
    width: '100%',
    padding: 0,
    borderSpacing: theme.spacing(0, 1.5),

    [theme.breakpoints.down('md')]: {
      borderCollapse: 'collapse',
      display: 'flex',
    },
  },
  label: {
    padding: theme.spacing(24, 16, 40),
    textAlign: 'center',
    width: '100%',
  },
}));

Table.Body = TableBody;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;
