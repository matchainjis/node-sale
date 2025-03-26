import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { BorderedPaper } from 'modules/common/components/BorderedPaper';
import { ClaimTable } from 'modules/dashboard/components/ClaimTable';
import { ClaimTabStatus } from 'modules/dashboard/components/ClaimTabStatus';
import { PoolTable } from 'modules/dashboard/components/PoolTable';
import { useTranslation } from 'modules/i18n';
import { useGetAccountPoolsQuery } from 'modules/pool/actions/getAccountPools';
import {
  EMPTY_POOL_UNSTAKES,
  useGetPendingUnstakesQuery,
} from 'modules/pool/actions/getPendingUnstakes';
import { useGetPoolAddressesQuery } from 'modules/pool/actions/getPoolAddresses';

import { translation } from './translation';
import { useStyles } from './useStyles';

const EMPTY_POOLS: string[] = [];
enum AccountPoolsTab {
  DELEGATED = 'DELEGATED',
  WITHDRAWALS = 'WITHDRAWALS',
}

export function AccountPools(): ReactElement | null {
  const { classes, cx } = useStyles();
  const { t, keys } = useTranslation(translation);
  const { data: pools = EMPTY_POOLS, isLoading: isPoolsLoading } =
    useGetPoolAddressesQuery();

  const [activeTab, setActiveTab] = useState<AccountPoolsTab>(
    AccountPoolsTab.DELEGATED,
  );

  const { isConnected } = useConnection();
  const { data: accountPools, isLoading: isAccountPoolsLoading } =
    useGetAccountPoolsQuery(
      { addresses: pools },
      {
        skip: !isConnected || !pools.length,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const isDelegateTabLoading = isAccountPoolsLoading || isPoolsLoading;

  const {
    data: poolUnstakes = EMPTY_POOL_UNSTAKES,
    isLoading: isPoolUnstakesLoading,
  } = useGetPendingUnstakesQuery(
    {
      poolAddresses: pools,
    },
    {
      skip: !isConnected || !pools.length,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const accountPoolAddresses = useMemo(
    () => accountPools?.map(({ address }) => address) ?? [],
    [accountPools],
  );

  useEffect(() => {
    if (isDelegateTabLoading || isPoolUnstakesLoading) {
      return;
    }

    if (!accountPoolAddresses?.length && poolUnstakes?.length) {
      setActiveTab(AccountPoolsTab.WITHDRAWALS);

      return;
    }

    if (accountPoolAddresses?.length && !poolUnstakes?.length) {
      setActiveTab(AccountPoolsTab.DELEGATED);
    }
  }, [
    accountPoolAddresses,
    isDelegateTabLoading,
    isPoolUnstakesLoading,
    poolUnstakes?.length,
  ]);

  const isActiveTab = useCallback(
    (tab: AccountPoolsTab) => tab === activeTab,
    [activeTab],
  );

  if (
    !isConnected ||
    (!accountPoolAddresses?.length && !poolUnstakes?.length)
  ) {
    return null;
  }

  return (
    <BorderedPaper className={classes.root}>
      <div className={classes.content}>
        <div className={classes.tabs}>
          {!!accountPoolAddresses?.length && (
            <Typography
              className={cx(
                classes.tab,
                isActiveTab(AccountPoolsTab.DELEGATED) && classes.activeTab,
              )}
              component="h2"
              variant="h5"
              onClick={() => setActiveTab(AccountPoolsTab.DELEGATED)}
            >
              {t(keys.myDelegations)}
            </Typography>
          )}

          {!!poolUnstakes?.length && (
            <div
              className={classes.withdrawals}
              onClick={() => setActiveTab(AccountPoolsTab.WITHDRAWALS)}
            >
              <Typography
                className={cx(
                  classes.tab,
                  isActiveTab(AccountPoolsTab.WITHDRAWALS) && classes.activeTab,
                )}
                component="h2"
                variant="h5"
              >
                {t(keys.withdrawals)}
              </Typography>

              <ClaimTabStatus poolUnstakes={poolUnstakes} />
            </div>
          )}
        </div>

        {activeTab === AccountPoolsTab.DELEGATED && (
          <PoolTable showDelegated poolAddresses={accountPoolAddresses} />
        )}

        {activeTab === AccountPoolsTab.WITHDRAWALS && (
          <ClaimTable pendingUnstakes={poolUnstakes} />
        )}
      </div>
    </BorderedPaper>
  );
}
