import { api, getReadProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

import { getPoolAddresses } from '../methods/getPoolAddresses';

export const EMPTY_POOL_ADDRESSES: string[] = [];

export const { useGetPoolAddressesQuery } = api.injectEndpoints({
  endpoints: build => ({
    getPoolAddresses: build.query<string[], void>({
      queryFn: async () => {
        const readProvider = await getReadProvider(chainId);

        return { data: await getPoolAddresses(readProvider) };
      },
    }),
  }),
});
