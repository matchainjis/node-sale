import { forwardRef, useMemo } from 'react';
import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CustomContentProps, SnackbarKey } from 'notistack';

import { ReactComponent as CloseIcon } from 'modules/common/icons/close-icon.svg';

export const Notification = forwardRef<
  HTMLDivElement,
  CustomContentProps & { onClose?: (id: SnackbarKey) => void }
>(({ message, header, action, id, variant, onClose }, ref) => {
  const _action = typeof action === 'function' ? action(id) : action;
  const theme = useTheme();

  const notificationPalette = useMemo(() => {
    if (
      variant === 'default' ||
      variant === 'info' ||
      !theme.palette[variant]
    ) {
      return theme.palette.info;
    }

    return theme.palette[variant];
  }, [theme.palette, variant]);

  return (
    <Stack
      ref={ref}
      alignItems={onClose ? 'flex-start' : 'center'}
      direction={onClose ? 'column' : 'row'}
      role="alert"
      sx={{
        backgroundColor: notificationPalette.light,
        border: `1px solid ${notificationPalette.main}`,
        color: notificationPalette.main,
        borderRadius: '16px',
        padding: theme.spacing(3, 2, 3, 4),
        justifyContent: 'space-between',
      }}
    >
      {onClose && (
        <IconButton
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
            width: 20,
          }}
          onClick={() => onClose(id)}
        >
          <CloseIcon height={16} width={16} />
        </IconButton>
      )}

      <Stack>
        <Typography component="div" fontWeight={700} variant="body2">
          {header}
        </Typography>

        <Typography fontWeight={500} variant="body2">
          {message}
        </Typography>
      </Stack>

      {_action}
    </Stack>
  );
});

Notification.displayName = 'Notification';
