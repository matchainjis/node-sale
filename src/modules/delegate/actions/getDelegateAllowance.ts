import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { MAIN_TOKEN_ADDRESS } from 'modules/api/const';
import {
  getAllowance,
  IGetAllowanceResult,
} from 'modules/api/methods/getAllowance';

interface IGetAllowanceParams {
  poolAddress: string;
}

export const {
  useGetDelegateAllowanceQuery,
  useLazyGetDelegateAllowanceQuery,
} = api.injectEndpoints({
  endpoints: build => ({
    getDelegateAllowance: build.query<IGetAllowanceResult, IGetAllowanceParams>(
      {
        queryFn: async ({ poolAddress }) => {
          const provider = await getReadProvider(chainId);
          const writeProvider = await getWriteProvider();

          const result = await getAllowance(provider, {
            userAddress: writeProvider.currentAccount,
            spender: poolAddress,
            tokenAddress: MAIN_TOKEN_ADDRESS,
          });

          return { data: result };
        },
        providesTags: [cacheTags.allowance],
      },
    ),
  }),
});
