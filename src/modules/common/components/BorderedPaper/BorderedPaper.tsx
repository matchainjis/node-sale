import { ReactElement } from 'react';
import { Paper, PaperProps } from '@mui/material';

import { useStyles } from './useStyles';

export function BorderedPaper({
  className,
  ...props
}: PaperProps): ReactElement {
  const { classes, cx } = useStyles();

  return <Paper {...props} className={cx(classes.root, className)} />;
}
