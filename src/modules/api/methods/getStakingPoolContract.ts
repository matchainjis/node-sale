import { Contract } from 'web3';

import { ReadProvider, WriteProvider } from 'modules/api/web3Provider';

import stakingPoolAbi from '../abi/StakingPool';

export function getStakingPoolContract(
  provider: ReadProvider | WriteProvider,
  poolAddress: string,
): Contract<typeof stakingPoolAbi> {
  return provider.createContract<typeof stakingPoolAbi>(
    stakingPoolAbi,
    poolAddress,
  );
}
