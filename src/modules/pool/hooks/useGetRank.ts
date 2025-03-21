import { useMemo } from 'react';

import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { EMPTY_POOLS, useGetPoolsQuery } from 'modules/pool/actions/getPools';

interface IGetRankResult {
  rank: number;
  totalRanks: number;
  isLoading: boolean;
}

export function useGetRank(poolAddress: string): IGetRankResult {
  const {
    data: addresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: pools = EMPTY_POOLS, isLoading: isPoolsLoading } =
    useGetPoolsQuery({ addresses });

  const rank = useMemo(() => {
    if (!pools.length) {
      return 0;
    }

    let poolNumber = 0;
    [...pools]
      .sort((a, b) => b.tvl.comparedTo(a.tvl))
      .find((pool, i) => {
        if (pool.address === poolAddress) {
          poolNumber = i + 1;
          return true;
        }

        return false;
      });

    return poolNumber;
  }, [poolAddress, pools]);

  return {
    rank,
    totalRanks: pools.length,
    isLoading: isPoolAddressesLoading || isPoolsLoading,
  };
}
