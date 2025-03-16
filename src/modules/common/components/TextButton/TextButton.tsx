import { ReactElement } from 'react';
import { Typography, TypographyProps } from '@mui/material';

import { useStyles } from './useStyles';

export function TextButton(props: TypographyProps): ReactElement {
  const { classes, cx } = useStyles();

  return (
    <Typography
      component="button"
      variant="body1"
      {...props}
      className={cx(classes.root, props?.className)}
    />
  );
}
