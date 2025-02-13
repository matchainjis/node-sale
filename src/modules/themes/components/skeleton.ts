import { Components } from '@mui/material';

export function getMuiSkeleton(): Components['MuiSkeleton'] {
  return {
    defaultProps: {
      animation: 'wave',
      variant: 'text',
    },
    styleOverrides: {
      root: {
        maxWidth: 100,
      },
    },
  };
}
