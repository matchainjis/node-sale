import { api, cacheTags, EvmWalletId, getWriteProvider } from 'modules/api';
import { closeDialog, selectDialogState } from 'modules/dialogs';
import { RootState } from 'modules/store';

import { queryFnNotifyWrapper } from '../../common/utils/queryFnNotifyWrapper';
import { CONNECTION_CACHE_KEY, WALLET_CONNECT_DIALOG_ID } from '../const';
import { storeWalletId } from '../utils/storeWalletId';

export interface IConnect {
  address: string;
  chainId: number;
  isActive: boolean;
  walletId: string;
}

type ConnectArgs = EvmWalletId | undefined;

export const {
  useConnectMutation,
  endpoints: { connect },
} = api.injectEndpoints({
  endpoints: build => ({
    connect: build.mutation<IConnect, ConnectArgs>({
      queryFn: queryFnNotifyWrapper<ConnectArgs, void, IConnect>(
        async walletKey => {
          const provider = await getWriteProvider(walletKey);
          const { id: walletId } = provider.getWalletMeta();
          const isActive = provider.isConnected();

          const data: IConnect = {
            address: provider.currentAccount,
            chainId: provider.currentChain,
            isActive,
            walletId: walletKey ?? walletId,
          };

          return { data };
        },
      ),
      async onQueryStarted(_arg, { queryFulfilled, dispatch, getState }) {
        return queryFulfilled.then(({ data }) => {
          const { walletId } = data;
          storeWalletId(walletId as EvmWalletId);

          const state = getState() as RootState;
          const { currentModal } = selectDialogState(state);

          if (currentModal === WALLET_CONNECT_DIALOG_ID) {
            dispatch(closeDialog());
          }
        });
      },
      invalidatesTags: [
        cacheTags.account,
        cacheTags.balance,
        cacheTags.chainData,
      ],
    }),
  }),
});

export const selectConnect = connect.select({
  fixedCacheKey: CONNECTION_CACHE_KEY,
  requestId: undefined,
});
