import { EVENTS, isEventProvider, ProviderEvents } from '@ankr.com/provider';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { utils } from 'web3';

import { getWriteProvider } from 'modules/api';
import { ChainId } from 'modules/api/chainIDs';
import { RootState } from 'modules/store';

import { connect, selectConnect } from './actions/connect';
import { disconnect } from './actions/disconnect';
import { switchNetwork } from './actions/switchNetwork';
import { CONNECTION_CACHE_KEY } from './const';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: action => {
    return !!connect?.matchFulfilled(action);
  },

  effect: async (_action, api) => {
    api.cancelActiveListeners();

    const ethWeb3KeyProvider = await getWriteProvider();
    const web3 = ethWeb3KeyProvider.getWeb3();
    const eventProvider = isEventProvider(web3?.currentProvider)
      ? web3.currentProvider
      : null;

    if (eventProvider === null) return;

    EVENTS.forEach(eventName => {
      if (typeof eventProvider.removeAllListeners === 'function') {
        eventProvider.removeAllListeners(eventName);
      }
    });

    eventProvider.on(ProviderEvents.AccountsChanged, async (data: string[]) => {
      const state = api.getState() as RootState;
      const { data: connectionData } = selectConnect(state);

      if (!connectionData?.isActive) return;

      const currentAddress = data.length ? data[0] : undefined;

      if (!currentAddress) {
        const disconnectThunk = disconnect.initiate(undefined, {
          fixedCacheKey: CONNECTION_CACHE_KEY,
        });

        const result = api.dispatch(disconnectThunk);
        result.reset();
      } else {
        const provider = await getWriteProvider();

        // todo: move this logic to the provider
        provider.currentAccount = currentAddress;

        const connectThunk = connect.initiate(undefined, {
          fixedCacheKey: CONNECTION_CACHE_KEY,
        });

        await api.dispatch(connectThunk);
      }
    });

    eventProvider.on(ProviderEvents.ChainChanged, data => {
      const state = api.getState() as RootState;
      const { data: connectionData } = selectConnect(state);

      if (!connectionData?.isActive) return;

      const chainId = data.toString().startsWith('0x')
        ? data
        : utils.numberToHex(data);

      const selectedChainId = Number.parseInt(chainId, 16) as ChainId;

      const switchNetworkThunk = switchNetwork.initiate(selectedChainId);

      const result = api.dispatch(switchNetworkThunk);
      result.reset();
    });
  },
});
