import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertToWei } from 'modules/api/utils';

import { ReadProvider, WriteProvider } from '../../api';

export async function getWithdrawFee(
  writeProvider: WriteProvider,
  readProvider: ReadProvider,
  data: {
    poolAddress: Address;
    amount: BigNumber;
  },
): Promise<BigNumber> {
  const { poolAddress, amount } = data;

  const poolContract = getStakingPoolContract(readProvider, poolAddress);

  const estimatedGas = await (async () => {
    try {
      return await poolContract.methods
        .unstake(convertToWei(amount))
        .estimateGas({
          from: writeProvider.currentAccount,
        });
    } catch {
      return 0;
    }
  })();

  return readProvider.getContractMethodFee(Number(estimatedGas));
}
