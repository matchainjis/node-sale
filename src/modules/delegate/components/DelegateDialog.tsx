import { ReactElement } from 'react';
import { Box } from '@mui/material';

import { KnownDialogs, useDialog } from 'modules/dialogs';
import { Dialog } from 'modules/dialogs/components/Dialog';

import { DelegateContent } from './DelegateContent';

export function DelegateDialog(): ReactElement {
  const {
    isOpened,
    onClose,
    context: poolAddress,
  } = useDialog<string>(KnownDialogs.delegate);

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
        <DelegateContent poolAddress={poolAddress} />
      </Box>
    </Dialog>
  );
}
