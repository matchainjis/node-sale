import { Contract } from 'web3';

import { getStakingPoolFactoryContract } from 'modules/api/methods/getStakingPoolFactoryContract';
import { memoizePromise } from 'modules/api/methods/memoizePromise';
import { ReadProvider, WriteProvider } from 'modules/api/web3Provider';

import poolOwnershipAbi from '../abi/PoolOwnership';

async function _getPoolOwnershipContract(
  provider: ReadProvider | WriteProvider,
): Promise<Contract<typeof poolOwnershipAbi>> {
  const stakingPoolFactoryContract =
    await getStakingPoolFactoryContract(provider);

  const poolOwnershipAddress = await stakingPoolFactoryContract.methods
    .ownershipNFT()
    .call();

  return provider.createContract<typeof poolOwnershipAbi>(
    poolOwnershipAbi,
    poolOwnershipAddress,
  );
}

export const getPoolOwnershipContract = memoizePromise(
  _getPoolOwnershipContract,
  provider => {
    return `${provider.currentChain}`;
  },
);
