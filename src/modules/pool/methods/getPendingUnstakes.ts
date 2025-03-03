import { subSeconds } from 'date-fns';
import PQueue from 'p-queue';

import { ReadProvider } from 'modules/api';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';
import { BASE_PQUEUE_CONFIG } from 'modules/common/const';
import { IPoolUnstake } from 'modules/pool/types';

interface IGetPendingUnstakes {
  poolAddresses: string[];
  accountAddress: string;
}

export async function getPendingUnstakes(
  provider: ReadProvider,
  { poolAddresses, accountAddress }: IGetPendingUnstakes,
): Promise<IPoolUnstake[]> {
  const currentBlock = await provider.getBlockNumber();
  const now = new Date().getTime();

  const queue = new PQueue(BASE_PQUEUE_CONFIG);

  const actions = poolAddresses.map(poolAddress => {
    return queue.add(async () => {
      const poolContract = getStakingPoolContract(provider, poolAddress);

      const pendingUnstakes = await poolContract.methods
        .pendingUnstakes(accountAddress)
        .call();

      return pendingUnstakes.map(({ amount, block }) => {
        const blockTime = 1;
        const blockDifference = currentBlock - Number(block);

        const now = new Date();
        const executedAt = subSeconds(now, blockDifference * blockTime);

        return {
          poolAddress,
          executedAt,
          amount: convertFromWei(amount),
        };
      });
    });
  });
  const results = await Promise.allSettled(actions);

  return results
    .map(result => (result.status === 'fulfilled' ? result.value : null))
    .flat()
    .filter((unstake): unstake is IPoolUnstake => !!unstake)
    .sort((a, b) => {
      const timeB = new Date(b.executedAt).getTime();
      const timeA = new Date(a.executedAt).getTime();

      return Math.abs(timeB - now) - Math.abs(timeA - now);
    });
}
