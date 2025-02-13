import { api, cacheTags } from 'modules/api';
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
        const result = await Promise.all(
          addresses.map(async address =>
            dispatch(getPoolEndpoint.initiate({ address })),
          ),
        );

        const pools = result.filter(r => !!r.data).map(r => r.data as IPool);

        return { data: pools };
      },
      providesTags: [cacheTags.pools],
    }),
  }),
});
