import React, { ReactElement } from 'react';
import { Button, MenuItem, Select } from '@mui/material';

import { useConnection } from 'modules/auth/hooks/useConnection';
import { cropString } from 'modules/common/utils/cropString';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { globalTranslation } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { MIN_BUTTON_WIDTH, useStyles } from './useStyles';

export function Account(): ReactElement {
  const { keys, t } = useTranslation(globalTranslation);
  const { classes } = useStyles();

  const { isConnected, address = '', disconnect } = useConnection();

  const { onOpen } = useDialog(KnownDialogs.connect);

  if (!isConnected) {
    return (
      <Button
        color="secondary"
        sx={{ minWidth: MIN_BUTTON_WIDTH }}
        variant="outlined"
        onClick={onOpen}
      >
        {t(keys.common.connectWallet)}
      </Button>
    );
  }

  return (
    <Select
      classes={{ root: classes.root, select: classes.select }}
      MenuProps={{ sx: { mt: 1 } }}
      renderValue={() => cropString(address)}
      value={address}
      variant="standard"
    >
      <MenuItem onClick={() => disconnect()}>
        {t(keys.common.disconnect)}
      </MenuItem>
    </Select>
  );
}
