import BigNumber from 'bignumber.js';

import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';
import { IPool, PoolStatus } from 'modules/pool/types';

export async function getPool(
  provider: ReadProvider,
  poolAddress: string,
): Promise<IPool | null> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const [isActive, totalStakeWei, feeWei, stakersWei] = await Promise.all([
    poolContract.methods.active().call(),
    poolContract.methods.totalStake().call(),
    poolContract.methods.fee().call(),
    poolContract.methods.stakers().call(),
  ]);

  const totalStake = convertFromWei(totalStakeWei);

  return {
    address: poolAddress,
    status: isActive ? PoolStatus.Active : PoolStatus.Unqualified,
    commission: convertFromWei(feeWei, 2),
    tvl: totalStake,
    totalDelegators: new BigNumber(Number(stakersWei)),
  };
}
