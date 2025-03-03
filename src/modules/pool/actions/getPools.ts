import PQueue from 'p-queue';

import { api, cacheTags } from 'modules/api';
import { BASE_PQUEUE_CONFIG } from 'modules/common/const';
import { getPoolEndpoint } from 'modules/pool/actions/getPool';
import { IPool } from 'modules/pool/types';

interface IGetPoolsArgs {
  addresses: string[];
}

export const EMPTY_POOLS: IPool[] = [];

export const { useGetPoolsQuery } = api.injectEndpoints({
  endpoints: build => ({
    getPools: build.query<IPool[], IGetPoolsArgs>({
      queryFn: async ({ addresses }, { dispatch }) => {
        const queue = new PQueue(BASE_PQUEUE_CONFIG);

        const requests = addresses.map(address =>
          queue.add(() => dispatch(getPoolEndpoint.initiate({ address }))),
        );
        const result = await Promise.allSettled(requests);

        const pools = result
          .map(result =>
            result.status === 'fulfilled' ? result.value?.data : null,
          )
          .filter(pool => !!pool)
          .map(pool => pool as IPool);

        return { data: pools };
      },
      providesTags: [cacheTags.pools],
    }),
  }),
});
