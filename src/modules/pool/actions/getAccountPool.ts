import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getAccountPool } from '../methods/getAccountPool';
import { IAccountPool } from '../types';

interface IGetAccountPoolArgs {
  address: string;
}

export const {
  useGetAccountPoolQuery,
  endpoints: { getAccountPool: getAccountPoolEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getAccountPool: build.query<IAccountPool | null, IGetAccountPoolArgs>({
      queryFn: async ({ address }) => {
        const readProvider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        return {
          data: await getAccountPool(readProvider, {
            poolAddress: address,
            accountAddress: writeProvider.currentAccount,
          }),
        };
      },
      providesTags: [cacheTags.account, cacheTags.pools],
    }),
  }),
});
