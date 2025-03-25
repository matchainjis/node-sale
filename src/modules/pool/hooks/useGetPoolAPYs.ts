import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { POOLS_LIMIT } from 'modules/api/const';
import { ZERO } from 'modules/common/const';
import { getWeightedAverage } from 'modules/common/utils/getWeightedAverage';
import { useGetSortedPools } from 'modules/pool/hooks/useGetSortedPools';
import { useGetTotalStaked } from 'modules/pool/hooks/useGetTotalStaked';
import { calculateAPY } from 'modules/pool/utils';

interface IUseGetPoolAPYsResult {
  avgAPY: BigNumber;
  poolAPYs: Record<string, BigNumber>;
  isLoading: boolean;
}

export function useGetPoolAPYs(
  poolsLimit: number = POOLS_LIMIT,
): IUseGetPoolAPYsResult {
  const { pools, isLoading: isPoolsLoading } = useGetSortedPools();
  const { totalStakedAmount, isLoading: isTotalStakedLoading } =
    useGetTotalStaked(poolsLimit);

  const poolAPYs = useMemo(
    () =>
      pools.reduce<Record<string, BigNumber>>(
        (acc, { address, commission }, i) => {
          if (i >= poolsLimit) {
            return {
              ...acc,
              [address]: ZERO,
            };
          }

          return {
            ...acc,
            [address]: calculateAPY({ totalStakedAmount, fee: commission }),
          };
        },
        {},
      ),
    [pools, poolsLimit, totalStakedAmount],
  );

  const avgAPY = useMemo(
    () =>
      getWeightedAverage(
        pools
          .slice(0, poolsLimit)
          .map(pool => [poolAPYs[pool.address], pool.tvl]),
      ),
    [pools, poolsLimit, poolAPYs],
  );

  return {
    avgAPY,
    poolAPYs,
    isLoading: isPoolsLoading || isTotalStakedLoading,
  };
}
