import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';

export async function getPoolOwner(
  provider: ReadProvider,
  poolAddress: string,
): Promise<string> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  return poolContract.methods.owner().call();
}
