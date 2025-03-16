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

interface IUseGetAccountTotalStakedResult {
  totalStakedAmount: BigNumber;
  isLoading: boolean;
}

export function useGetAccountTotalStaked(): IUseGetAccountTotalStakedResult {
  const {
    data: poolsAddresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolsAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: pools = EMPTY_ACCOUNT_POOLS, isLoading: isPoolsLoading } =
    useGetAccountPoolsQuery(
      {
        addresses: poolsAddresses,
      },
      {
        skip: poolsAddresses.length === 0,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const totalStakedAmount = useMemo(
    () => pools.reduce((acc, { stakedAmount }) => acc.plus(stakedAmount), ZERO),
    [pools],
  );

  return {
    totalStakedAmount,
    isLoading: isPoolsAddressesLoading || isPoolsLoading,
  };
}
