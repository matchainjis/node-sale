import { useMemo } from 'react';

import { useGetSortedPools } from 'modules/pool/hooks/useGetSortedPools';

interface IGetRankResult {
  rank: number;
  totalRanks: number;
  isLoading: boolean;
}

export function useGetRank(poolAddress: string): IGetRankResult {
  const { pools, isLoading } = useGetSortedPools();

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
    isLoading,
  };
}
