import { useCallback } from 'react';
import { EWalletId, getWalletIcon } from '@ankr.com/provider';

import type { EvmWalletId } from 'modules/api';

import { useConnectMutation } from '../actions/connect';
import { useDisconnectMutation } from '../actions/disconnect';
import { CONNECTION_CACHE_KEY } from '../const';

export interface IConnectionData {
  address?: string;
  chainId?: number;
  isConnected: boolean;
  isLoading: boolean;
  walletIcon?: string;
  walletId?: string;
  connect: (walletId?: EvmWalletId) => Promise<boolean>;
  disconnect: () => void;
  features: { isAddTokenAvailable: boolean };
}

export function useConnection(): IConnectionData {
  const [connect, { data, isLoading }] = useConnectMutation({
    fixedCacheKey: CONNECTION_CACHE_KEY,
  });

  const [disconnect] = useDisconnectMutation({
    fixedCacheKey: CONNECTION_CACHE_KEY,
  });

  const {
    address,
    chainId,
    isActive: isConnected = false,
    walletId,
  } = data ?? {};

  const handleConnect = useCallback(
    async (walletId?: EvmWalletId) => {
      const result = await connect(walletId);

      return !!result?.data?.isActive;
    },
    [connect],
  );

  const handleDisconnect = useCallback(() => {
    const result = disconnect();
    result.reset();
  }, [disconnect]);

  return {
    address,
    chainId,
    isConnected,
    isLoading,
    walletId,
    walletIcon: walletId ? getWalletIcon(walletId as EWalletId) : undefined,
    connect: handleConnect,
    disconnect: handleDisconnect,
    features: {
      isAddTokenAvailable: walletId !== EWalletId.walletconnect,
    },
  };
}
