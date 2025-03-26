import PQueue from 'p-queue';

import { api, cacheTags } from 'modules/api';
import { BASE_PQUEUE_CONFIG, ZERO } from 'modules/common/const';
import { getAccountPoolEndpoint } from 'modules/pool/actions/getAccountPool';

import { IAccountPool } from '../types';

interface IGetAccountPoolsArgs {
  addresses: string[];
}

export const EMPTY_ACCOUNT_POOLS: IAccountPool[] = [];

export const { useGetAccountPoolsQuery } = api.injectEndpoints({
  endpoints: build => ({
    getAccountPools: build.query<IAccountPool[], IGetAccountPoolsArgs>({
      queryFn: async ({ addresses }, { dispatch }) => {
        const queue = new PQueue(BASE_PQUEUE_CONFIG);

        const requests = addresses.map(address =>
          queue.add(() =>
            dispatch(getAccountPoolEndpoint.initiate({ address })),
          ),
        );

        const results = await Promise.allSettled(requests);

        const pools = results
          .map(result =>
            result.status === 'fulfilled' ? result.value?.data : null,
          )
          .filter(pool => !!pool && pool?.stakedAmount.isGreaterThan(ZERO))
          .map(pool => pool as IAccountPool);

        return { data: pools };
      },
      providesTags: [cacheTags.account, cacheTags.pools],
    }),
  }),
});
