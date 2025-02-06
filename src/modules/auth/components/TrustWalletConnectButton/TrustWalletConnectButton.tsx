import { ReactElement } from 'react';
import { EWalletId, useConnectBtnTrust } from '@ankr.com/provider';

import { useIsMobile } from 'modules/common/hooks/useIsMobile';

import { ConnectButton } from '../ConnectButton';

const TRUST_WALLET_ID = EWalletId.trust;

interface ITrustWalletConnectButtonProps {
  onConnect: (walletId: EWalletId) => void;
  disabled?: boolean;
}

export function TrustWalletConnectButton({
  onConnect,
  disabled,
}: ITrustWalletConnectButtonProps): ReactElement {
  const {
    isDisabled: isDisabledByOtherWallet,
    isInjected,
    deepLink,
    downloadUrl,
  } = useConnectBtnTrust();

  const isMobileDevice = useIsMobile();

  return (
    <ConnectButton
      deepLink={isMobileDevice && !isInjected ? deepLink : undefined}
      disabled={disabled || isDisabledByOtherWallet}
      installLink={isMobileDevice || isInjected ? undefined : downloadUrl}
      walletId={TRUST_WALLET_ID}
      onConnect={onConnect}
    />
  );
}
