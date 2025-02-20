import { ReactElement } from 'react';
import { useMediaQuery } from '@mui/material';

import { Table } from 'modules/common/components/Table';
import { DEFAULT_LONG_DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { ActionsCell } from 'modules/dashboard/components/ActionsCell';
import { AmountCell } from 'modules/dashboard/components/AmountCell';
import { PoolCell } from 'modules/dashboard/components/PoolCell';
import { StatusCell } from 'modules/dashboard/components/StatusCell';
import {
  globalTranslation,
  mergeTranslations,
  useTranslation,
} from 'modules/i18n';
import { getAccountPoolEndpoint } from 'modules/pool/actions/getAccountPool';
import { getPoolEndpoint } from 'modules/pool/actions/getPool';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import { translation } from '../PoolTable/translation';
import { useStyles } from './useStyles';

interface IDelegateTableProps {
  poolAddress: string;
  className?: string;
  showDelegated?: boolean;
}

const mergedTranslation = mergeTranslations(globalTranslation, translation);

export function PoolRow({
  poolAddress,
  className,
  showDelegated = false,
}: IDelegateTableProps): ReactElement | null {
  const { classes, theme } = useStyles();
  const { t, keys } = useTranslation(mergedTranslation);
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const { data: pool } = getPoolEndpoint.useQueryState({
    address: poolAddress,
  });

  const { data: accountPool } = getAccountPoolEndpoint.useQueryState({
    address: poolAddress,
  });

  const { poolAPYs } = useGetPoolAPYs();
  const apy = poolAPYs[poolAddress] ?? ZERO;

  if (!pool) {
    return null;
  }

  const { name, image, address, status, tvl, totalDelegators, commission } =
    pool;

  const delegators = t(keys.delegatorsValue, {
    value: totalDelegators.toNumber(),
  });

  const emptyCell = isMd ? null : <Table.Cell />;
  const stakedAmount = accountPool?.stakedAmount ?? ZERO;

  return (
    <Table.Row className={className}>
      <PoolCell
        address={address}
        className={classes.poolCell}
        delegators={isMd ? delegators : undefined}
        icon={image}
        poolName={name}
        status={isMd ? status : undefined}
      />

      {!isMd && <StatusCell mdLabel={t(keys.status)} status={status} />}

      <AmountCell
        amount={t(keys.unit.tokenValue, {
          value: tvl.decimalPlaces(DEFAULT_LONG_DECIMAL_PLACES).toFormat(),
          token: t(keys.tokens.main),
        })}
        className={classes.commonMdCell}
        mdLabel={t(keys.tvl)}
        subAmount={isMd ? undefined : delegators}
      />

      <AmountCell
        amount={t(keys.unit.percent, { value: commission })}
        className={classes.commonMdCell}
        mdLabel={t(keys.commission)}
      />

      <AmountCell
        amount={t(keys.unit.percent, { value: apy.decimalPlaces(2) })}
        className={showDelegated ? classes.commonMdCell : undefined}
        mdLabel={t(keys.apy)}
      />

      {showDelegated ? (
        <AmountCell
          amount={t(keys.unit.tokenValue, {
            value: stakedAmount
              .decimalPlaces(DEFAULT_LONG_DECIMAL_PLACES)
              .toFormat(),
            token: t(keys.tokens.main),
          })}
          mdLabel={t(keys.myPosition)}
        />
      ) : (
        emptyCell
      )}

      <ActionsCell
        align="right"
        className={classes.actions}
        isDelegateOnly={!showDelegated}
        poolAddress={poolAddress}
      />
    </Table.Row>
  );
}
