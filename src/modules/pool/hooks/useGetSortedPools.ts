import { useMemo } from 'react';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { EMPTY_POOLS, useGetPoolsQuery } from 'modules/pool/actions/getPools';
import { IPool } from 'modules/pool/types';

interface IGetLimitedPoolsResult {
  pools: IPool[];
  isLoading: boolean;
}

export function useGetSortedPools(): IGetLimitedPoolsResult {
  const {
    data: addresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: pools = EMPTY_POOLS, isLoading: isPoolsLoading } =
    useGetPoolsQuery(
      { addresses },
      {
        skip: addresses.length === 0,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const sortedPools = useMemo(() => {
    return [...pools].sort((a, b) => b.tvl.comparedTo(a.tvl));
  }, [pools]);

  return {
    pools: sortedPools,
    isLoading: isPoolAddressesLoading || isPoolsLoading,
  };
}
