import { Contract } from 'web3';

import { getMainTokenContract } from 'modules/api/methods/getMainTokenContract';
import { memoizePromise } from 'modules/api/methods/memoizePromise';
import { ReadProvider, WriteProvider } from 'modules/api/web3Provider';

import stakingPoolFactoryAbi from '../abi/StakingPoolFactory';

async function _getStakingPoolFactoryContract(
  provider: ReadProvider | WriteProvider,
): Promise<Contract<typeof stakingPoolFactoryAbi>> {
  const MATHTokenContract = getMainTokenContract(provider);

  const poolFactoryAddress = await MATHTokenContract.methods
    .poolFactory()
    .call();

  return provider.createContract<typeof stakingPoolFactoryAbi>(
    stakingPoolFactoryAbi,
    poolFactoryAddress,
  );
}

export const getStakingPoolFactoryContract = memoizePromise(
  _getStakingPoolFactoryContract,
  provider => {
    return `${provider.currentChain}`;
  },
);
