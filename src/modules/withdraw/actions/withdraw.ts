import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { api, cacheTags, getWriteProvider } from 'modules/api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { withdraw } from '../methods/withdraw';

interface IWithdrawArgs {
  poolAddress: Address;
  amount: BigNumber;
}

export const { useWithdrawMutation } = api.injectEndpoints({
  endpoints: build => ({
    withdraw: build.mutation<boolean, IWithdrawArgs>({
      queryFn: queryFnNotifyWrapper<IWithdrawArgs, void, boolean>(
        async ({ amount, poolAddress }) => {
          const writeProvider = await getWriteProvider();

          const result = await withdraw(writeProvider, {
            poolAddress,
            amount,
          });

          void (await result.receiptPromise);

          return {
            data: true,
          };
        },
      ),
      invalidatesTags: [cacheTags.account, cacheTags.pools, cacheTags.unstake],
    }),
  }),
});
