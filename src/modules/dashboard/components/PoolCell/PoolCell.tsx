import { ReactElement } from 'react';
import { Skeleton, Typography } from '@mui/material';

import { Table } from 'modules/common/components/Table';
import { TableCellProps } from 'modules/common/components/Table/TableCell';
import { cropString } from 'modules/common/utils/cropString';
import { Status } from 'modules/pool/components/Status';
import { PoolStatus } from 'modules/pool/types';

import { useStyles } from './useStyles';

interface IPoolNameCellProps extends TableCellProps {
  poolName?: string;
  icon?: string;
  address: string;
  delegators?: string;
  status?: PoolStatus;
}

export function PoolCell({
  poolName,
  icon,
  address,
  delegators,
  status,
  ...props
}: IPoolNameCellProps): ReactElement {
  const { classes } = useStyles();

  return (
    <Table.Cell {...props}>
      <div className={classes.root}>
        <div className={classes.pool}>
          {icon ? (
            <img alt="" className={classes.icon} src={icon} />
          ) : (
            <Skeleton className={classes.icon} height={30} />
          )}

          <div>
            <Typography component="div" variant="body1">
              {poolName || <Skeleton />}
            </Typography>

            <div className={classes.labels}>
              <Typography component="div" variant="subtitle2">
                {cropString(address)}
              </Typography>

              {delegators && (
                <>
                  <div className={classes.circle} />

                  <Typography component="div" variant="subtitle2">
                    {delegators}
                  </Typography>
                </>
              )}
            </div>
          </div>
        </div>

        {status ? <Status status={status} /> : undefined}
      </div>
    </Table.Cell>
  );
}
