import { ReactElement } from 'react';
import { Box } from '@mui/material';

import { DelegateContent } from 'modules/delegate/components/DelegateContent';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { Dialog } from 'modules/dialogs/components/Dialog';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';

export function AddSelfStakeDialog(): ReactElement {
  const { t, keys } = useTranslation(translation);
  const {
    isOpened,
    onClose,
    context: poolAddress,
  } = useDialog<string>(KnownDialogs.addSelfstake);

  return (
    <Dialog key={poolAddress} open={isOpened} onClose={onClose}>
      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          minHeight: 487,

          [theme.breakpoints.down('md')]: { minHeight: 475 },
        })}
      >
        <DelegateContent formTitle={t(keys.title)} poolAddress={poolAddress} />
      </Box>
    </Dialog>
  );
}
