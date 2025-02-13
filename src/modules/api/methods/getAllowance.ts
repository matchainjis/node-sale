import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import IERC20Abi from '../abi/IERC20';
import { convertFromWei } from '../utils';
import { ReadProvider } from '../web3Provider';

export interface IGetAllowanceResult {
  allowance: BigNumber;
  spender: Address;
}

export async function getAllowance(
  provider: ReadProvider,
  data: { userAddress: Address; spender: Address; tokenAddress: Address },
): Promise<IGetAllowanceResult> {
  const { userAddress, spender, tokenAddress } = data;

  const tokenContract = provider.createContract<typeof IERC20Abi>(
    IERC20Abi,
    tokenAddress,
  );

  const allowance: bigint = await tokenContract.methods
    .allowance(userAddress, spender)
    .call();

  return {
    allowance: convertFromWei(allowance),
    spender,
  };
}
