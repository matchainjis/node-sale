import { ReactElement, useState } from 'react';

import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';
import { SuccessDialogContent } from 'modules/common/components/SuccessDialogContent/SuccessDialogContent';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useWithdrawMutation } from 'modules/withdraw/actions/withdraw';
import successImage from 'modules/withdraw/assets/withdraw-success.png';
import { WithdrawForm } from 'modules/withdraw/components/WithdrawForm';

import { translation } from './translation';

interface IWithdrawContentProps {
  poolAddress: string;
}

export function WithdrawContent({
  poolAddress,
}: IWithdrawContentProps): ReactElement | null {
  const { t, keys } = useTranslation(translation);
  const { onClose } = useDialog(KnownDialogs.withdraw);

  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const [withdraw, { isLoading, data }] = useWithdrawMutation();
  const [success, setSuccess] = useState(false);

  if (!pool) {
    return null;
  }

  if ((!isLoading && data) || success) {
    return (
      <SuccessDialogContent
        buttonLabel={t(keys.buttonText)}
        description={t(keys.doneDescription, { period: UNSTAKE_PERIOD_DAYS })}
        image={successImage}
        title={t(keys.done)}
        onClose={onClose}
      />
    );
  }

  return (
    <WithdrawForm
      isSubmitLoading={isLoading}
      poolAddress={poolAddress}
      onSubmit={({ amount }) =>
        withdraw({ amount, poolAddress }).then(({ data }) => setSuccess(!!data))
      }
    />
  );
}
