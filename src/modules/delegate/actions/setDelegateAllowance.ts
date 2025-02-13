import BigNumber from 'bignumber.js';
import { Address } from 'web3';

import { api, cacheTags, getWriteProvider } from 'modules/api';
import { MAIN_TOKEN_ADDRESS } from 'modules/api/const';
import { setAllowance } from 'modules/api/methods/setAllowance';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

interface ISetDelegateAllowanceArgs {
  poolAddress: Address;
  amount: BigNumber;
}

export const { useSetDelegateAllowanceAllowanceMutation } = api.injectEndpoints(
  {
    endpoints: build => ({
      setDelegateAllowanceAllowance: build.mutation<
        boolean,
        ISetDelegateAllowanceArgs
      >({
        queryFn: queryFnNotifyWrapper<ISetDelegateAllowanceArgs, void, boolean>(
          async ({ amount, poolAddress }) => {
            const writeProvider = await getWriteProvider();

            const result = await setAllowance(writeProvider, {
              spender: poolAddress,
              tokenAddress: MAIN_TOKEN_ADDRESS,
              amount,
            });

            void (await result.receiptPromise);

            return {
              data: true,
            };
          },
        ),
        invalidatesTags: [cacheTags.allowance],
      }),
    }),
  },
);
