import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getPendingUnstakes } from '../methods/getPendingUnstakes';
import { IPoolUnstake } from '../types';

interface IGetPoolArgs {
  poolAddress: string;
}

export const EMPTY_POOL_UNSTAKES: IPoolUnstake[] = [];

export const {
  useGetPoolPendingUnstakesQuery,
  endpoints: { getPoolPendingUnstakes: getPoolPendingUnstakesEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getPoolPendingUnstakes: build.query<IPoolUnstake[], IGetPoolArgs>({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        return {
          data: await getPendingUnstakes(readProvider, {
            poolAddresses: [poolAddress],
            accountAddress: writeProvider.currentAccount,
          }),
        };
      },
      providesTags: [cacheTags.account, cacheTags.unstake, cacheTags.claim],
    }),
  }),
});
