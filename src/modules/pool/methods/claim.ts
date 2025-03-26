import { IWeb3SendResult } from '@ankr.com/provider/src/providerManager/providers/Web3KeyWriteProvider';
import { Address } from 'web3';

import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';

import { WriteProvider } from '../../api';

export async function claim(
  provider: WriteProvider,
  data: {
    poolAddress: Address;
  },
): Promise<IWeb3SendResult> {
  const { poolAddress } = data;

  const poolContract = getStakingPoolContract(provider, poolAddress);

  const transactionData = poolContract.methods.claimUnstakes().encodeABI();

  return provider.sendTransactionAsync(provider.currentAccount, poolAddress, {
    data: transactionData,
    estimate: true,
    estimateFee: true,
  });
}
