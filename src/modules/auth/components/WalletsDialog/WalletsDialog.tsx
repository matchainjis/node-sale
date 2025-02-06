import { ReactElement, useCallback } from 'react';
import { EWalletId } from '@ankr.com/provider';
import { Typography } from '@mui/material';

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
    <Dialog
      classes={{ paper: classes.paper }}
      open={isOpened}
      onClose={onClose}
    >
      <Typography mt={15} variant="h5">
        {t(keys.title)}
      </Typography>

      <Typography mt={3} variant="body2">
        {t(keys.description)}
      </Typography>

      <div className={classes.wallets}>
        <MetamaskConnectButton disabled={isLoading} onConnect={handleConnect} />

        <ConnectButton
          disabled={isLoading}
          walletId={EWalletId.walletconnect}
          onConnect={handleConnect}
        />
      </div>
    </Dialog>
  );
}
