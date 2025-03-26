import { Components } from '@mui/material';

export function getMuiTextField(): Components['MuiTextField'] {
  return {
    defaultProps: {
      variant: 'filled',
    },
    styleOverrides: {
      root: {
        background: 'transparent',
      },
    },
  };
}
