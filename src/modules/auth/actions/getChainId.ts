import { EEthereumNetworkId } from '@ankr.com/provider';

import { api, cacheTags, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';

export const {
  useGetChainIdQuery,
  endpoints: { getChainId },
} = api.injectEndpoints({
  endpoints: build => ({
    getChainId: build.query<EEthereumNetworkId | null, void>({
      queryFn: async () => {
        const provider = await getWriteProvider();

        const currentChainId = await provider.getWeb3().eth.getChainId();
        if (currentChainId) {
          return { data: Number(currentChainId) };
        }

        if (!Object.values(EEthereumNetworkId).includes(chainId)) {
          return { data: null };
        }

        return { data: chainId };
      },
      providesTags: [cacheTags.account],
    }),
  }),
});
