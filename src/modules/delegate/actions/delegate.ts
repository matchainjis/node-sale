import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { api, cacheTags, getWriteProvider } from 'modules/api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { delegate } from '../methods/delegate';

interface IDelegateArgs {
  poolAddress: Address;
  amount: BigNumber;
}

export const { useDelegateMutation } = api.injectEndpoints({
  endpoints: build => ({
    delegate: build.mutation<boolean, IDelegateArgs>({
      queryFn: queryFnNotifyWrapper<IDelegateArgs, void, boolean>(
        async ({ amount, poolAddress }) => {
          const writeProvider = await getWriteProvider();

          const result = await delegate(writeProvider, {
            poolAddress,
            amount,
          });

          void (await result.receiptPromise);

          return {
            data: true,
          };
        },
      ),
      invalidatesTags: [
        cacheTags.account,
        cacheTags.pools,
        cacheTags.allowance,
      ],
    }),
  }),
});
