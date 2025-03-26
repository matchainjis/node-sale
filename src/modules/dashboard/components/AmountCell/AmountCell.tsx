import { ReactElement } from 'react';
import { alpha, Typography } from '@mui/material';

import { Table } from 'modules/common/components/Table';
import { TableCellProps } from 'modules/common/components/Table/TableCell';

import { useStyles } from './useStyles';

interface IAmountCellProps extends TableCellProps {
  amount: string;
  subAmount?: string;
}

export function AmountCell({
  amount,
  subAmount,
  ...props
}: IAmountCellProps): ReactElement {
  const { classes } = useStyles();

  return (
    <Table.Cell {...props}>
      <div className={classes.root}>
        <Typography component="div" variant="body1">
          {amount}
        </Typography>

        {subAmount && (
          <Typography
            color={theme => alpha(theme.palette.text.primary, 0.6)}
            component="div"
            variant="subtitle2"
          >
            {subAmount}
          </Typography>
        )}
      </div>
    </Table.Cell>
  );
}
