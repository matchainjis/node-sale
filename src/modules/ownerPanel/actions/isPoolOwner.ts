import { api, cacheTags, getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { isPoolOwner } from '../methods/isPoolOwner';

interface IGetOwnerPoolAddressesArgs {
  poolAddress: string;
}

export const {
  useGetIsOwnerPoolQuery,
  endpoints: { getIsOwnerPool: getIsOwnerPoolEndpoint },
} = api.injectEndpoints({
  endpoints: build => ({
    getIsOwnerPool: build.query<boolean, IGetOwnerPoolAddressesArgs>({
      queryFn: async ({ poolAddress }) => {
        const readProvider = await getReadProvider(chainId);
        const writeProvider = await getWriteProvider();

        const isOwner = await isPoolOwner(readProvider, {
          poolAddress,
          accountAddress: writeProvider.currentAccount,
        });

        return { data: isOwner };
      },
      providesTags: [cacheTags.pools, cacheTags.account],
    }),
  }),
});
