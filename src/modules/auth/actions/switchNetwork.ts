import { api, getWriteProvider } from 'modules/api';
import { ChainId } from 'modules/api/chainIDs';
import { getExtendedErrorText } from 'modules/common/utils/getExtendedErrorText';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { t } from 'modules/i18n';

import { CONNECTION_CACHE_KEY } from '../const';
import { connect } from './connect';

export const {
  useSwitchNetworkMutation,
  endpoints: { switchNetwork },
} = api.injectEndpoints({
  endpoints: build => {
    return {
      switchNetwork: build.mutation<ChainId, ChainId>({
        queryFn: queryFnNotifyWrapper<ChainId, never, ChainId>(
          async chainId => {
            const provider = await getWriteProvider();

            await provider.switchNetwork(chainId);

            // todo: move this logic to the provider
            provider.currentChain = chainId;

            return { data: chainId };
          },
          error => getExtendedErrorText(error, t('requestError.switchNetwork')),
        ),

        onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
          return queryFulfilled.then(async () => {
            const connectThunk = connect.initiate(undefined, {
              fixedCacheKey: CONNECTION_CACHE_KEY,
            });

            await dispatch(connectThunk);
          });
        },
      }),
    };
  },
});
