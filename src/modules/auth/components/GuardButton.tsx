import { ReactElement } from 'react';

import { chainId } from 'modules/api/chainIDs';
import { useGetChainIdQuery } from 'modules/auth/actions/getChainId';
import { useSwitchNetworkMutation } from 'modules/auth/actions/switchNetwork';
import { useConnection } from 'modules/auth/hooks/useConnection';
import {
  ILoadingButtonProps,
  LoadingButton,
} from 'modules/common/components/LoadingButton';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { globalTranslation, useTranslation } from 'modules/i18n';

export function GuardButton(props: ILoadingButtonProps): ReactElement {
  const { isConnected } = useConnection();
  const { t, keys } = useTranslation(globalTranslation);

  const { onOpen } = useDialog(KnownDialogs.connect);

  const { data: currentChainId } = useGetChainIdQuery(undefined, {
    skip: !isConnected,
  });
  const [switchNetwork, { isLoading }] = useSwitchNetworkMutation();

  if (!isConnected) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disabled, loading, children, ...buttonProps } = props;

    return (
      <LoadingButton {...buttonProps} onClick={onOpen}>
        {t(keys.common.connectWallet)}
      </LoadingButton>
    );
  }

  if (currentChainId !== chainId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disabled, loading, children, ...buttonProps } = props;

    return (
      <LoadingButton
        {...buttonProps}
        loading={isLoading}
        onClick={() => switchNetwork(chainId)}
      >
        {t(keys.common.switchNetwork)}
      </LoadingButton>
    );
  }

  return <LoadingButton {...props} />;
}
