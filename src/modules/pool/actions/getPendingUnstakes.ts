import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getPendingUnstakes } from '../methods/getPendingUnstakes';
import { IPoolUnstake } from '../types';

interface IGetPoolArgs {
  poolAddresses: string[];
}

export const EMPTY_POOL_UNSTAKES: IPoolUnstake[] = [];

export const {
  useGetPendingUnstakesQuery,
  endpoints: { getPendingUnstakes: getPendingUnstakesEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getPendingUnstakes: build.query<IPoolUnstake[], IGetPoolArgs>({
      queryFn: async ({ poolAddresses }) => {
        const readProvider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        return {
          data: await getPendingUnstakes(readProvider, {
            poolAddresses,
            accountAddress: writeProvider.currentAccount,
          }),
        };
      },
      providesTags: [cacheTags.account, cacheTags.unstake, cacheTags.claim],
    }),
  }),
});
