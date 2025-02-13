import { ReactElement } from 'react';

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

  if (!isConnected) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disabled, loading, children, ...buttonProps } = props;

    return (
      <LoadingButton {...buttonProps} onClick={onOpen}>
        {t(keys.common.connectWallet)}
      </LoadingButton>
    );
  }

  return <LoadingButton {...props} />;
}
