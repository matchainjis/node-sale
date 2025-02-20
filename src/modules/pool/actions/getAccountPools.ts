import { api, cacheTags } from 'modules/api';
import { ZERO } from 'modules/common/const';
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
        const result = await Promise.all(
          addresses.map(async address =>
            dispatch(getAccountPoolEndpoint.initiate({ address })),
          ),
        );

        const pools = result
          .filter(
            pool => !!pool.data && pool.data.stakedAmount.isGreaterThan(ZERO),
          )
          .map(pool => pool.data as IAccountPool);

        return { data: pools };
      },
      providesTags: [cacheTags.account, cacheTags.pools],
    }),
  }),
});
