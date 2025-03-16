import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getNFTToken } from 'modules/ownerPanel/methods/getNFTToken';

interface IGetOwnerPoolAddressesArgs {
  poolAddress: string;
}

export const {
  useGetNFTTokenQuery,
  endpoints: { getNFTToken: getNFTTokenEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getNFTToken: build.query<string, IGetOwnerPoolAddressesArgs>({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);

        return {
          data: await getNFTToken(readProvider, {
            poolAddress,
          }),
        };
      },
      providesTags: [cacheTags.pools, cacheTags.account],
    }),
  }),
});
