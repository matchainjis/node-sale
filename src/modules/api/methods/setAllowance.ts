import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { convertToWei } from 'modules/api/utils';
import { WriteProvider } from 'modules/api/web3Provider';

import IERC20Abi from '../abi/IERC20';

export async function setAllowance(
  provider: WriteProvider,
  data: {
    spender: Address;
    tokenAddress: Address;
    amount: BigNumber;
  },
) {
  const { spender, tokenAddress, amount } = data;

  const tokenContract = provider.createContract(IERC20Abi, tokenAddress);

  const transactionData = tokenContract.methods
    .approve(spender, convertToWei(amount))
    .encodeABI();

  return provider.sendTransactionAsync(provider.currentAccount, tokenAddress, {
    data: transactionData,
    estimate: true,
    estimateFee: true,
  });
}
