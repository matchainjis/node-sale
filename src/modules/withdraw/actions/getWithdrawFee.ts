import BigNumber from 'bignumber.js';

import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getWithdrawFee } from '../methods/getWithdrawFee';

interface IGetApproveAmountParams {
  poolAddress: string;
  amount: BigNumber;
}

export const { useGetWithdrawFeeQuery } = api.injectEndpoints({
  endpoints: build => ({
    getWithdrawFee: build.query<BigNumber, IGetApproveAmountParams>({
      queryFn: async ({ poolAddress, amount }) => {
        const provider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        const result = await getWithdrawFee(writeProvider, provider, {
          poolAddress,
          amount,
        });

        return { data: result };
      },
      providesTags: [cacheTags.account],
    }),
  }),
});
