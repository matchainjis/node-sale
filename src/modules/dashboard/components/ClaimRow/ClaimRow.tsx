import { ReactElement } from 'react';
import { format } from 'date-fns';

import { Table } from 'modules/common/components/Table';
import { DEFAULT_LONG_DECIMAL_PLACES } from 'modules/common/const';
import { AmountCell } from 'modules/dashboard/components/AmountCell';
import { PoolCell } from 'modules/dashboard/components/PoolCell';
import { UnlockClaimCell } from 'modules/dashboard/components/UnlockClaimCell/UnlockClaimCell';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { getPoolEndpoint } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { IPoolUnstake } from 'modules/pool/types';

import { translation } from '../ClaimTable/translation';
import { useStyles } from './useStyles';

interface IDelegateTableProps {
  className?: string;
  isHidePoolName?: boolean;
  poolUnstake: IPoolUnstake;
}

export function ClaimRow({
  className,
  poolUnstake,
  isHidePoolName,
}: IDelegateTableProps): ReactElement | null {
  const { classes } = useStyles();
  const { t, keys } = useGlobalTranslation(translation);

  const { data: pool } = getPoolEndpoint.useQueryState({
    address: poolUnstake.poolAddress,
  });

  const { data: poolMeta } = useGetPoolMetaQuery({
    address: poolUnstake.poolAddress,
  });

  if (!pool) {
    return null;
  }

  return (
    <Table.Row className={className}>
      {!isHidePoolName && (
        <PoolCell
          address={poolUnstake.poolAddress}
          className={classes.poolCell}
          icon={poolMeta?.image}
          poolName={poolMeta?.name}
        />
      )}

      <AmountCell
        amount={t(keys.unit.tokenValue, {
          value: poolUnstake.amount
            .decimalPlaces(DEFAULT_LONG_DECIMAL_PLACES)
            .toFormat(),
          token: t(keys.tokens.main),
        })}
        className={classes.commonMdCell}
        mdLabel={t(keys.withdrawalAmount)}
      />

      <AmountCell
        amount={format(poolUnstake.executedAt, 'MMM dd, yyyy')}
        className={classes.commonMdCell}
        mdLabel={t(keys.initiated)}
        subAmount={format(poolUnstake.executedAt, 'hh:mm a')}
      />

      <UnlockClaimCell
        align="right"
        className={classes.actions}
        executedAt={poolUnstake.executedAt}
        poolAddress={poolUnstake.poolAddress}
      />
    </Table.Row>
  );
}
