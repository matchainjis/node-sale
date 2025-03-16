import BigNumber from 'bignumber.js';

import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';

const ONE_DAY_IN_SECONDS = 86400;

export interface IGetCommissionInfo {
  totalDelayDays: number;
  remainingDays: number;
  maxCommission: BigNumber;
}

export async function getCommissionInfo(
  provider: ReadProvider,
  poolAddress: string,
): Promise<IGetCommissionInfo> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const [lastFeeChangeBlockRaw, feeLockPeriodRaw, maxFeeRaw, currentBlockRaw] =
    await Promise.all([
      poolContract.methods.lastFeeChange().call(),
      poolContract.methods.FEE_LOCK_PERIOD().call(),
      poolContract.methods.MAX_POOL_FEE().call(),
      provider.getWeb3().eth.getBlockNumber(),
    ]);

  const currentBlock = Number(currentBlockRaw);
  const lastFeeChangeBlock = Number(lastFeeChangeBlockRaw);
  const feeLockPeriod = Number(feeLockPeriodRaw);
  const maxFee = Number(maxFeeRaw);

  const blocksSinceLastChange = currentBlock - lastFeeChangeBlock;

  const totalDelayDays = Math.ceil(feeLockPeriod / ONE_DAY_IN_SECONDS);
  const remainingDays = Math.ceil(
    (feeLockPeriod - blocksSinceLastChange) / ONE_DAY_IN_SECONDS,
  );

  const positiveRemainingDays = Math.max(remainingDays, 0);

  return {
    totalDelayDays,
    remainingDays: positiveRemainingDays,
    maxCommission: new BigNumber(maxFee),
  };
}
