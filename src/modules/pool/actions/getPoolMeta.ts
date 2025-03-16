import PQueue from 'p-queue';

import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getPoolMeta } from 'modules/pool/methods/getPoolMeta';

import { IPoolMeta } from '../types';

interface IGetPoolArgs {
  address: string;
}

const queue = new PQueue({
  concurrency: 1,
  interval: 300,
  intervalCap: 1,
  autoStart: true,
});

export const {
  useGetPoolMetaQuery,
  endpoints: { getPoolMeta: getPoolMetaEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getPoolMeta: build.query<IPoolMeta | null, IGetPoolArgs>({
      queryFn: async ({ address }) => {
        const result = await queue.add(async () => {
          const readProvider = await getReadProvider(chainId);

          return getPoolMeta(readProvider, address);
        });

        return { data: result ?? null };
      },
      providesTags: [cacheTags.poolsMeta],
    }),
  }),
});
