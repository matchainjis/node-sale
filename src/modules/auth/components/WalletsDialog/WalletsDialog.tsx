import { ReactElement, useCallback } from 'react';
import { EWalletId } from '@ankr.com/provider';

import { TrustWalletConnectButton } from 'modules/auth/components/TrustWalletConnectButton';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { Dialog } from 'modules/dialogs/components/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useConnection } from '../../hooks/useConnection';
import { ConnectButton } from '../ConnectButton';
import { MetamaskConnectButton } from '../MetamaskConnectButton';
import { translation } from './translation';
import { useStyles } from './useStyles';

export function WalletsDialog(): ReactElement {
  const { isOpened, onClose } = useDialog(KnownDialogs.connect);
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const { connect, isLoading } = useConnection();

  const handleConnect = useCallback(
    async (walletId: EWalletId) => {
      const isConnected = await connect(walletId);

      if (isConnected) {
        onClose();
      }
    },
    [connect, onClose],
  );

  return (
    <Dialog open={isOpened} title={t(keys.title)} onClose={onClose}>
      <div className={classes.wallets}>
        <MetamaskConnectButton disabled={isLoading} onConnect={handleConnect} />

        <TrustWalletConnectButton
          disabled={isLoading}
          onConnect={handleConnect}
        />

        <ConnectButton
          disabled={isLoading}
          walletId={EWalletId.walletconnect}
          onConnect={handleConnect}
        />
      </div>
    </Dialog>
  );
}
