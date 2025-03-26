import { ReactElement } from 'react';
import BigNumber from 'bignumber.js';

import { SuccessDialogContent } from 'modules/common/components/SuccessDialogContent/SuccessDialogContent';
import successImage from 'modules/delegate/assets/delegate-success.png';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';

import { useEditPoolMutation } from '../../actions/editPool';
import { EditPoolForm } from '../EditPoolForm';
import { translation } from './translation';

interface IEditPoolContentProps {
  poolAddress: string;
}

export function EditPoolContent({
  poolAddress,
}: IEditPoolContentProps): ReactElement | null {
  const { t, keys } = useTranslation(translation);
  const { onClose } = useDialog(KnownDialogs.withdraw);

  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const [edit, { isLoading, data }] = useEditPoolMutation();

  if (!pool) {
    return null;
  }

  if (!isLoading && data) {
    return (
      <SuccessDialogContent
        buttonLabel={t(keys.buttonText)}
        image={successImage}
        title={t(keys.done)}
        onClose={onClose}
      />
    );
  }

  return (
    <EditPoolForm
      isSubmitLoading={isLoading}
      poolAddress={poolAddress}
      onSubmit={params =>
        edit({
          ...params,
          comission: new BigNumber(params.comission),
          poolAddress,
        })
      }
    />
  );
}
