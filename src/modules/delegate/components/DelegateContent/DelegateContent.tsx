import { ReactElement } from 'react';

import { SuccessDialogContent } from 'modules/common/components/SuccessDialogContent/SuccessDialogContent';
import { useDelegateMutation } from 'modules/delegate/actions/delegate';
import successImage from 'modules/delegate/assets/delegate-success.png';
import { DelegateForm } from 'modules/delegate/components/DelegateForm';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';

import { translation } from './translation';

interface IDelegateContentProps {
  poolAddress: string;
}

export function DelegateContent({
  poolAddress,
}: IDelegateContentProps): ReactElement | null {
  const { t, keys } = useTranslation(translation);
  const { onClose } = useDialog(KnownDialogs.delegate);

  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const [delegate, { isLoading, data }] = useDelegateMutation();
  if (!pool) {
    return null;
  }

  if (!isLoading && data) {
    return (
      <SuccessDialogContent
        buttonLabel={t(keys.buttonText)}
        description={t(keys.doneDescription)}
        image={successImage}
        title={t(keys.done)}
        onClose={onClose}
      />
    );
  }

  return (
    <DelegateForm
      isSubmitLoading={isLoading}
      poolAddress={poolAddress}
      onSubmit={({ amount }) => delegate({ amount, poolAddress })}
    />
  );
}
