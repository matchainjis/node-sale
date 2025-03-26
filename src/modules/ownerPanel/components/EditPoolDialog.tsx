import { ReactElement } from 'react';
import { Box } from '@mui/material';

import { KnownDialogs, useDialog } from 'modules/dialogs';
import { Dialog } from 'modules/dialogs/components/Dialog';

import { EditPoolContent } from './EditPoolContent';

export function EditPoolDialog(): ReactElement {
  const {
    isOpened,
    onClose,
    context: poolAddress,
  } = useDialog<string>(KnownDialogs.editPool);

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
        <EditPoolContent poolAddress={poolAddress} />
      </Box>
    </Dialog>
  );
}
