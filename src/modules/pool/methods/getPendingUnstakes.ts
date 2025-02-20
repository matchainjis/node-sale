import { subSeconds } from 'date-fns';

import { ReadProvider } from 'modules/api';
import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { convertFromWei } from 'modules/api/utils';
import { IPoolUnstake } from 'modules/pool/types';

interface IGetPendingUnstakes {
  poolAddresses: string[];
  accountAddress: string;
}

const TWO_WEEK_BLOCKS = UNSTAKE_PERIOD_DAYS * 24 * 60 * 60 * 2;

export async function getPendingUnstakes(
  provider: ReadProvider,
  { poolAddresses, accountAddress }: IGetPendingUnstakes,
): Promise<IPoolUnstake[]> {
  const currentBlock = await provider.getBlockNumber();
  const offset = currentBlock - TWO_WEEK_BLOCKS;
  const now = new Date().getTime();

  return (
    await Promise.all(
      poolAddresses.map(async poolAddress => {
        try {
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
              isClaimable: Number(block) < offset,
            };
          });
        } catch {
          return [];
        }
      }),
    )
  )
    .flat()
    .sort((a, b) => {
      const timeB = new Date(b.executedAt).getTime();
      const timeA = new Date(a.executedAt).getTime();

      return Math.abs(timeB - now) - Math.abs(timeA - now);
    });
}
