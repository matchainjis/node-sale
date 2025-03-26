import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';
import { IAccountPool } from 'modules/pool/types';

export async function getAccountPool(
  provider: ReadProvider,
  {
    poolAddress,
    accountAddress,
  }: { poolAddress: string; accountAddress: string },
): Promise<IAccountPool | null> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const stakedAmountWei = await poolContract.methods
    .currentStake(accountAddress)
    .call();

  return {
    address: poolAddress,
    stakedAmount: convertFromWei(stakedAmountWei),
  };
}
