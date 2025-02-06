import { ReactElement, useMemo } from 'react';
import { EWalletId, useConnectBtnMetaMask } from '@ankr.com/provider';

import { useIsMobile } from 'modules/common/hooks/useIsMobile';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { getAppBacklink } from '../../utils/getAppBacklink';
import { ConnectButton } from '../ConnectButton';
import { translation } from './translation';

const METAMASK_WALLET_ID = EWalletId.injected;

interface IMetamaskConnectButtonProps {
  onConnect: (walletId: EWalletId) => void;
  disabled?: boolean;
}

export function MetamaskConnectButton({
  onConnect,
  disabled,
}: IMetamaskConnectButtonProps): ReactElement {
  const {
    isDisabled: isMetamaskDisabled,
    isInjected,
    isDisabledByOtherWallets,
    isDisabledByTrustWallet,
    isRedefinedByCoin98,
    isDisabledByBitget,
    isDisabledByBybit,
    deepLink,
    downloadUrl,
  } = useConnectBtnMetaMask(getAppBacklink(METAMASK_WALLET_ID));

  const { t, keys } = useTranslation(translation);

  const tooltip = useMemo(() => {
    if (disabled) {
      return undefined;
    }

    if (isRedefinedByCoin98) {
      return t(keys.metamaskCoin98);
    }

    if (isDisabledByBitget) {
      return t(keys.metamaskBitget);
    }

    if (isDisabledByTrustWallet) {
      return t(keys.metamaskTrust);
    }

    if (isDisabledByBybit) {
      return t(keys.metamaskBybit);
    }

    if (isDisabledByOtherWallets) {
      return t(keys.metamaskOther);
    }

    return undefined;
  }, [
    disabled,
    isRedefinedByCoin98,
    isDisabledByBitget,
    isDisabledByTrustWallet,
    isDisabledByBybit,
    isDisabledByOtherWallets,
    t,
    keys.metamaskCoin98,
    keys.metamaskBitget,
    keys.metamaskTrust,
    keys.metamaskBybit,
    keys.metamaskOther,
  ]);

  const isMobileDevice = useIsMobile();

  return (
    <ConnectButton
      deepLink={isMobileDevice && !isInjected ? deepLink : undefined}
      disabled={disabled || isMetamaskDisabled}
      installLink={isMobileDevice || isInjected ? undefined : downloadUrl}
      tooltip={tooltip}
      walletId={METAMASK_WALLET_ID}
      onConnect={onConnect}
    />
  );
}
