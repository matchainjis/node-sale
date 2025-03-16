import BigNumber from 'bignumber.js';

import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getAvailableSelfStakeAmount } from 'modules/ownerPanel/methods/getSelfStakedAmount';

interface IGetAvailableSelfStakeAmountArgs {
  poolAddress: string;
}

export const {
  useGetAvailableSelfStakeAmountQuery,
  endpoints: { getAvailableSelfStakeAmount: getSelfStakedAmountEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getAvailableSelfStakeAmount: build.query<
      BigNumber,
      IGetAvailableSelfStakeAmountArgs
    >({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);

        return {
          data: await getAvailableSelfStakeAmount(readProvider, {
            poolAddress,
          }),
        };
      },
      providesTags: [cacheTags.account, cacheTags.pools],
    }),
  }),
});
