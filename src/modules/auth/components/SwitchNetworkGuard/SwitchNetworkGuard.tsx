import React, { ReactNode, useCallback } from 'react';
import { Box, Button } from '@mui/material';

import { ChainId } from 'modules/api/chainIDs';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useSwitchNetworkMutation } from '../../actions/switchNetwork';
import { useConnection } from '../../hooks/useConnection';
import { translation } from './translation';

interface ISwitchNetworkGuardProps {
  children: ReactNode;
  chainId: ChainId;
}

export function SwitchNetworkGuard({
  children,
  chainId,
}: ISwitchNetworkGuardProps) {
  const { t, keys } = useTranslation(translation);

  const [switchNetwork, { isLoading: isSwitchNetworkLoading }] =
    useSwitchNetworkMutation();

  const { chainId: currentChainId } = useConnection();

  const handleSwitchNetwork = useCallback(() => {
    void switchNetwork(chainId);
  }, [chainId, switchNetwork]);

  if (currentChainId !== chainId) {
    return (
      <Box margin="auto">
        <Button disabled={isSwitchNetworkLoading} onClick={handleSwitchNetwork}>
          {t(keys.switchNetwork)}
        </Button>
      </Box>
    );
  }

  return children;
}
