import { useEffect } from 'react';

import { restoreWalletId } from '../utils/storeWalletId';
import { useConnection } from './useConnection';

export function useAuth(): void {
  const { connect } = useConnection();

  useEffect(() => {
    const walletId = restoreWalletId();

    if (!walletId) {
      return;
    }
    void connect(walletId);
  }, [connect]);
}
