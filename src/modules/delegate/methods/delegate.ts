import { IWeb3SendResult } from '@ankr.com/provider/src/providerManager/providers/Web3KeyWriteProvider';
import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertToWei } from 'modules/api/utils';

import { WriteProvider } from '../../api';

export async function delegate(
  provider: WriteProvider,
  data: {
    poolAddress: Address;
    amount: BigNumber;
  },
): Promise<IWeb3SendResult> {
  const { poolAddress, amount } = data;

  const poolContract = getStakingPoolContract(provider, poolAddress);

  const transactionData = poolContract.methods
    .stake(convertToWei(amount))
    .encodeABI();

  return provider.sendTransactionAsync(provider.currentAccount, poolAddress, {
    data: transactionData,
    estimate: true,
    estimateFee: true,
  });
}
