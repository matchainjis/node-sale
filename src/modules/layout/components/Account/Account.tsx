import React, { ReactElement } from 'react';
import { Button, MenuItem, Select, useMediaQuery } from '@mui/material';

import { useConnection } from 'modules/auth/hooks/useConnection';
import { cropString } from 'modules/common/utils/cropString';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { globalTranslation } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import BurgerIcon from '../../assets/burger.svg?react';
import CloseIcon from '../../assets/close.svg?react';
import { MIN_BUTTON_WIDTH, useStyles } from './useStyles';

interface IAccountProps {
  showMenu: boolean;
  isShowBurger?: boolean;
  onShowMenu: (showMenu: boolean) => void;
}

export function Account({
  showMenu,
  onShowMenu,
  isShowBurger = false,
}: IAccountProps): ReactElement {
  const { keys, t } = useTranslation(globalTranslation);
  const { classes, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

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
    <div className={classes.root}>
      <Select
        classes={{ root: classes.selectRoot, select: classes.select }}
        MenuProps={{ sx: { mt: 1 } }}
        renderValue={() => cropString(address)}
        value={address}
        variant="standard"
      >
        <MenuItem onClick={() => disconnect()}>
          {t(keys.common.disconnect)}
        </MenuItem>
      </Select>

      {isMd && isShowBurger && (
        <Button
          className={classes.squareButton}
          color="secondary"
          variant="outlined"
          onClick={() => onShowMenu(!showMenu)}
        >
          {showMenu ? <CloseIcon /> : <BurgerIcon />}
        </Button>
      )}
    </div>
  );
}
