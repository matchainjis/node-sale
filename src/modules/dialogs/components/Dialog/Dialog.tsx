import { ReactElement } from 'react';
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { DialogClasses } from '@mui/material/Dialog/dialogClasses';

import CloseIcon from 'modules/common/icons/close-icon.svg?react';
import { createMainTheme } from 'modules/themes/mainTheme';

import { useStyles } from './useStyles';

interface Props extends MuiDialogProps {
  title?: string;
  onClose?: () => void;
}

const EMPTY_CLASSES: Partial<DialogClasses> = {};

const lightTheme = createMainTheme('light');

export function Dialog({
  onClose,
  title,
  children,
  ...props
}: Props): ReactElement {
  const { classes, cx } = useStyles();
  const propsClasses = props?.classes || EMPTY_CLASSES;

  return (
    <ThemeProvider theme={lightTheme}>
      <MuiDialog
        {...props}
        classes={{
          ...propsClasses,
          paper: cx(classes.paper, propsClasses?.paper),
        }}
        className={cx(classes.root, props.className)}
        onClose={onClose}
      >
        {title && (
          <Typography textAlign="center" textTransform="uppercase" variant="h2">
            {title}
          </Typography>
        )}

        <div className={classes.button} onClick={onClose}>
          <CloseIcon />
        </div>

        {children}
      </MuiDialog>
    </ThemeProvider>
  );
}
