import { ReactElement } from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  IconButton,
} from '@mui/material';
import { DialogClasses } from '@mui/material/Dialog/dialogClasses';

import { ReactComponent as CloseIcon } from 'modules/common/icons/close-icon.svg';

import { useStyles } from './useStyles';

interface Props extends MuiDialogProps {
  onClose?: () => void;
}

const EMPTY_CLASSES: Partial<DialogClasses> = {};

export function Dialog({ onClose, children, ...props }: Props): ReactElement {
  const { classes, cx } = useStyles();
  const propsClasses = props?.classes || EMPTY_CLASSES;

  return (
    <MuiDialog
      {...props}
      classes={{
        ...propsClasses,
        paper: cx(classes.paper, propsClasses?.paper),
      }}
      className={cx(classes.root, props.className)}
      onClose={onClose}
    >
      <IconButton
        className={classes.button}
        color="secondary"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      {children}
    </MuiDialog>
  );
}
