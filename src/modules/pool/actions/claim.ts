import { Address } from 'web3';

import { api, cacheTags, getWriteProvider } from 'modules/api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { claim } from '../methods/claim';

interface IClaimArgs {
  poolAddress: Address;
}

export const { useClaimMutation } = api.injectEndpoints({
  endpoints: build => ({
    claim: build.mutation<boolean, IClaimArgs>({
      queryFn: queryFnNotifyWrapper<IClaimArgs, void, boolean>(
        async ({ poolAddress }) => {
          const writeProvider = await getWriteProvider();

          const result = await claim(writeProvider, {
            poolAddress,
          });

          void (await result.receiptPromise);

          return {
            data: true,
          };
        },
      ),
      invalidatesTags: [cacheTags.claim, cacheTags.account],
    }),
  }),
});
