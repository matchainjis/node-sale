import BigNumber from 'bignumber.js';

import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';

export async function getAvailableSelfStakeAmount(
  provider: ReadProvider,
  { poolAddress }: { poolAddress: string },
): Promise<BigNumber> {
  const poolContract = getStakingPoolContract(provider, poolAddress);

  const availableSelfStakeWei = await poolContract.methods
    .getAvailableSelfStake()
    .call();

  return convertFromWei(availableSelfStakeWei);
}
