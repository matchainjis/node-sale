import BigNumber from 'bignumber.js';

import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getMainTokenBalance } from 'modules/api/methods/getMainTokenBalance';

export const { useGetMainTokenBalanceQuery } = api.injectEndpoints({
  endpoints: build => ({
    getMainTokenBalance: build.query<BigNumber, void>({
      queryFn: async () => {
        const provider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        const result = await getMainTokenBalance(
          provider,
          writeProvider.currentAccount,
        );

        return { data: result };
      },
      providesTags: [cacheTags.account],
    }),
  }),
});
