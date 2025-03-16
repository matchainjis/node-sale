import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';

export async function isPoolOwner(
  provider: ReadProvider,
  {
    poolAddress,
    accountAddress,
  }: { poolAddress: string; accountAddress: string },
) {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const owner = await poolContract.methods.owner().call();

  return owner.toLowerCase() === accountAddress.toLowerCase();
}
