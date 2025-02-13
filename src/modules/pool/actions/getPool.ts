import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getPool } from '../methods/getPool';
import { IPool } from '../types';

interface IGetPoolArgs {
  address: string;
}

export const {
  useGetPoolQuery,
  endpoints: { getPool: getPoolEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getPool: build.query<IPool | null, IGetPoolArgs>({
      queryFn: async ({ address }) => {
        const readProvider = await getReadProvider(chainId);

        return { data: await getPool(readProvider, address) };
      },
      providesTags: [cacheTags.pools],
    }),
  }),
});
