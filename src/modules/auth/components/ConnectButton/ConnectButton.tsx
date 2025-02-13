import { ReactElement, useMemo } from 'react';
import { EWalletId, getWalletIcon } from '@ankr.com/provider';
import { getWalletName } from '@ankr.com/provider/src/utils/getWalletName';
import { Box, Button, ButtonProps, Tooltip, Typography } from '@mui/material';

import { useStyles } from './useStyles';

interface IConnectButtonProps extends ButtonProps {
  installLink?: string;
  deepLink?: string;
  tooltip?: string;
  walletId: EWalletId;
  onConnect: (walletId: EWalletId) => void;
}

export function ConnectButton({
  walletId,
  installLink,
  disabled,
  deepLink,
  tooltip,
  onConnect,
  ...props
}: IConnectButtonProps): ReactElement {
  const { classes, cx } = useStyles();

  const buttonProps = useMemo(() => {
    const isLink = (!!installLink || !!deepLink) && !disabled;
    if (isLink) {
      return {
        href: deepLink ?? installLink,
        rel: 'noreferrer',
        target: '_blank',
        component: 'a',
      };
    }

    return {
      onClick: disabled ? undefined : () => onConnect(walletId),
    };
  }, [onConnect, deepLink, disabled, installLink, walletId]);

  return (
    <Tooltip arrow title={disabled && tooltip ? tooltip : ''}>
      <Button
        {...props}
        {...buttonProps}
        className={cx(classes.root, props.className)}
        color="info"
        disabled={disabled}
        variant="outlined"
      >
        <Box
          className={classes.iconContainer}
          sx={{ opacity: disabled ? 0.7 : 1 }}
        >
          <img alt="" className={classes.icon} src={getWalletIcon(walletId)} />
        </Box>

        <Typography fontWeight={600} variant="body1">
          {getWalletName(walletId)}
        </Typography>
      </Button>
    </Tooltip>
  );
}
