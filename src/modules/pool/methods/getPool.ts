import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';
import { ZERO } from 'modules/common/const';
import { getPoolMeta } from 'modules/pool/methods/getPoolMeta';
import { IPool, PoolStatus } from 'modules/pool/types';

export async function getPool(
  provider: ReadProvider,
  poolAddress: string,
): Promise<IPool | null> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const [meta, isActive, totalStakeWei, feeWei] = await Promise.all([
    getPoolMeta(provider, poolAddress),
    poolContract.methods.active().call(),
    poolContract.methods.totalStake().call(),
    poolContract.methods.fee().call(),
  ]);

  const totalStake = convertFromWei(totalStakeWei);

  return {
    ...meta,
    address: poolAddress,
    status: isActive ? PoolStatus.Active : PoolStatus.Unqualified,
    commission: convertFromWei(feeWei, 2),
    tvl: totalStake,
    totalDelegators: ZERO,
  };
}
