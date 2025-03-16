import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { getWeightedAverage } from 'modules/common/utils/getWeightedAverage';
import { useGetTotalStaked } from 'modules/pool/hooks/useGetTotalStaked';
import { calculateAPY } from 'modules/pool/utils';

import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from '../actions/getPoolAddresses';
import { EMPTY_POOLS, useGetPoolsQuery } from '../actions/getPools';

interface IUseGetPoolAPYsResult {
  avgAPY: BigNumber;
  poolAPYs: Record<string, BigNumber>;
  isLoading: boolean;
}

export function useGetPoolAPYs(): IUseGetPoolAPYsResult {
  const {
    data: poolsAddresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolsAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: pools = EMPTY_POOLS, isLoading: isPoolsLoading } =
    useGetPoolsQuery(
      {
        addresses: poolsAddresses,
      },
      {
        skip: poolsAddresses.length === 0,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const { totalStakedAmount, isLoading } = useGetTotalStaked();
  const poolAPYs = useMemo(
    () =>
      pools.reduce<Record<string, BigNumber>>(
        (acc, { address, commission }) => ({
          ...acc,
          [address]: calculateAPY({ totalStakedAmount, fee: commission }),
        }),
        {},
      ),
    [pools, totalStakedAmount],
  );

  const avgAPY = useMemo(
    () =>
      getWeightedAverage(pools.map(pool => [poolAPYs[pool.address], pool.tvl])),
    [pools, poolAPYs],
  );

  return {
    avgAPY,
    poolAPYs,
    isLoading: isPoolsAddressesLoading || isPoolsLoading || isLoading,
  };
}
