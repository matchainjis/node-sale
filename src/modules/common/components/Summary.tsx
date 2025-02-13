import { ReactElement } from 'react';
import { Box, BoxProps } from '@mui/material';

export function Summary(props: BoxProps): ReactElement {
  return (
    <Box
      {...props}
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5),
        width: '100%',
      })}
    />
  );
}
