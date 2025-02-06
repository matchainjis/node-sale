import { IconButton } from '@mui/material';

import { ReactComponent as CloseIcon } from 'modules/common/icons/close-icon.svg';

import { useNotificationCloseStyles } from './useNotificationCloseStyles';

interface INotificationCloseProps {
  onClick?: () => void;
}

export function NotificationClose({
  onClick,
}: INotificationCloseProps): JSX.Element {
  const { cx, classes } = useNotificationCloseStyles();

  return (
    <IconButton
      className={cx(classes.root, classes.placementTopRight)}
      onClick={onClick}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  );
}
