import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

import { KnownDialogs, useDialog } from '../../../dialogs';
import { useTranslation } from '../../../i18n/hooks/useTranslation';
import { useConnection } from '../../hooks/useConnection';
import { translation } from './translation';

interface IWalletConnectGuardProps {
  children: ReactNode;
}

export function WalletConnectGuard({ children }: IWalletConnectGuardProps) {
  const { t, keys } = useTranslation(translation);
  const { onOpen } = useDialog(KnownDialogs.connect);

  const { isConnected, isLoading } = useConnection();

  if (!isConnected) {
    return (
      <Button disabled={isLoading} onClick={onOpen}>
        {t(keys.connectWallet)}
      </Button>
    );
  }

  return children;
}
