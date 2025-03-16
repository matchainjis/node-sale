import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';

export function getNFTToken(
  provider: ReadProvider,
  { poolAddress }: { poolAddress: string },
): Promise<string> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  return poolContract.methods.ownershipNFT().call();
}
