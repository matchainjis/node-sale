import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import {
  getCommissionInfo,
  IGetCommissionInfo,
} from 'modules/ownerPanel/methods/getCommissionInfo';

interface IGetCommissionArgs {
  poolAddress: string;
}

export const { useGetCommissionInfoQuery } = api.injectEndpoints({
  endpoints: build => ({
    getCommissionInfo: build.query<IGetCommissionInfo, IGetCommissionArgs>({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);

        return {
          data: await getCommissionInfo(readProvider, poolAddress),
        };
      },
      providesTags: [cacheTags.pools, cacheTags.account],
    }),
  }),
});
