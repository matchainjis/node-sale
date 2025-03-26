import BigNumber from 'bignumber.js';

import { getMainTokenContract } from 'modules/api/methods/getMainTokenContract';
import { convertFromWei } from 'modules/api/utils';
import { ReadProvider } from 'modules/api/web3Provider';

export async function getMainTokenBalance(
  readProvider: ReadProvider,
  accountAddress: string,
): Promise<BigNumber> {
  const contract = getMainTokenContract(readProvider);

  const balanceWei: bigint = await contract.methods
    .balanceOf(accountAddress)
    .call();

  return convertFromWei(balanceWei);
}
