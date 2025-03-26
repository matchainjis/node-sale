import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getPoolOwner } from 'modules/pool/methods/getPoolOwner';

interface IGetPoolOwnerArgs {
  address: string;
}

export const {
  useGetPoolOwnerQuery,
  endpoints: { getPoolOwner: getPoolOwnerEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getPoolOwner: build.query<string, IGetPoolOwnerArgs>({
      queryFn: async ({ address }) => {
        const readProvider = await getReadProvider(chainId);

        return { data: await getPoolOwner(readProvider, address) };
      },
      providesTags: [cacheTags.pools],
    }),
  }),
});
