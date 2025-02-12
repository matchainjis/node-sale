import { useCallback } from 'react';
import { closeSnackbar, SnackbarKey, SnackbarProvider } from 'notistack';

import { useStyles } from 'modules/notifications/components/CustomizedSnackbarProvider/useStyles';

import { Notification } from '../Notification';
import { NotificationClose } from '../NotificationClose';

/**
 * Notification provider with custom styles.
 *
 * Docs: https://notistack.com/getting-started#usage
 */
export function CustomizedSnackbarProvider() {
  const { classes } = useStyles();

  const renderActionSlot = useCallback((key: SnackbarKey) => {
    const handleClick = () => closeSnackbar(key);
    return <NotificationClose onClick={handleClick} />;
  }, []);

  return (
    <SnackbarProvider
      disableWindowBlurListener
      preventDuplicate
      action={renderActionSlot}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={8_000}
      classes={{
        containerAnchorOriginBottomLeft:
          classes.containerAnchorOriginBottomLeft,
        containerAnchorOriginTopCenter: classes.containerAnchorOriginTopCenter,
      }}
      Components={{
        success: Notification,
        info: Notification,
        warning: Notification,
        error: Notification,
        default: Notification,
      }}
      maxSnack={3}
    />
  );
}
