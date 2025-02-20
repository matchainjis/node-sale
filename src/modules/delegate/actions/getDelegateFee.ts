import BigNumber from 'bignumber.js';

import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { getDelegateFee } from 'modules/delegate/methods/getDelegateFee';

interface IGetApproveAmountParams {
  poolAddress: string;
  amount: BigNumber;
}

export const { useGetDelegateFeeQuery } = api.injectEndpoints({
  endpoints: build => ({
    getDelegateFee: build.query<BigNumber, IGetApproveAmountParams>({
      queryFn: async ({ poolAddress, amount }) => {
        const provider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        const result = await getDelegateFee(writeProvider, provider, {
          poolAddress,
          amount,
        });

        return { data: result };
      },
      providesTags: [cacheTags.account],
    }),
  }),
});
