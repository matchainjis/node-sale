import BigNumber from 'bignumber.js';

import { api, cacheTags, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getOwnerSelfStakeAmount } from 'modules/ownerPanel/methods/getOwnerSelfStakeAmount';

interface IGetOwnerSelfStakeAmountArgs {
  poolAddress: string;
}

export const {
  useGetOwnerSelfStakeAmountQuery,
  endpoints: { getOwnerSelfStakeAmount: getSelfStakedAmountEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getOwnerSelfStakeAmount: build.query<
      BigNumber,
      IGetOwnerSelfStakeAmountArgs
    >({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);

        return {
          data: await getOwnerSelfStakeAmount(readProvider, {
            poolAddress,
          }),
        };
      },
      providesTags: [cacheTags.pools],
    }),
  }),
});
