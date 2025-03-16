import BigNumber from 'bignumber.js';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { ZERO } from 'modules/common/const';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { EMPTY_POOLS, useGetPoolsQuery } from 'modules/pool/actions/getPools';

interface IUseGetTotalStakedResult {
  totalStakedAmount: BigNumber;
  isLoading: boolean;
}

export function useGetTotalStaked(): IUseGetTotalStakedResult {
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

  return {
    totalStakedAmount: pools.reduce((acc, { tvl }) => acc.plus(tvl), ZERO),
    isLoading: isPoolsAddressesLoading || isPoolsLoading,
  };
}
