import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { ZERO } from 'modules/common/const';
import {
  EMPTY_ACCOUNT_POOLS,
  useGetAccountPoolsQuery,
} from 'modules/pool/actions/getAccountPools';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { useGetSortedPools } from 'modules/pool/hooks/useGetSortedPools';

interface IUseGetAccountTotalStakedResult {
  totalStakedAmount: BigNumber;
  isLoading: boolean;
}

export function useGetAccountTotalStaked(): IUseGetAccountTotalStakedResult {
  const {
    data: poolsAddresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolsAddressesLoading,
  } = useGetPoolAddressesQuery();
  const {
    data: accountPools = EMPTY_ACCOUNT_POOLS,
    isLoading: isPoolsLoading,
  } = useGetAccountPoolsQuery(
    {
      addresses: poolsAddresses,
    },
    {
      skip: poolsAddresses.length === 0,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const { pools, isLoading } = useGetSortedPools();

  const totalStakedAmount = useMemo(() => {
    if (!pools) {
      return ZERO;
    }

    const availablePoolAddresses = new Set(pools.map(({ address }) => address));

    return accountPools
      .filter(({ address }) => availablePoolAddresses.has(address))
      .reduce((acc, { stakedAmount }) => acc.plus(stakedAmount), ZERO);
  }, [accountPools, pools]);

  return {
    totalStakedAmount,
    isLoading: isPoolsAddressesLoading || isPoolsLoading || isLoading,
  };
}
