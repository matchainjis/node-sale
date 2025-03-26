import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { useGetSortedPools } from 'modules/pool/hooks/useGetSortedPools';

interface IUseGetTotalStakedResult {
  totalStakedAmount: BigNumber;
  isLoading: boolean;
}

export function useGetTotalStaked(
  poolsLimit?: number,
): IUseGetTotalStakedResult {
  const { pools, isLoading } = useGetSortedPools();

  const totalStakedAmount = useMemo(
    () =>
      (typeof poolsLimit === 'number'
        ? pools.slice(0, poolsLimit)
        : pools
      ).reduce((acc, { tvl }) => acc.plus(tvl), ZERO),
    [pools, poolsLimit],
  );

  return {
    totalStakedAmount,
    isLoading,
  };
}
