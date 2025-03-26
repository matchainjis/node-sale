import { Components } from '@mui/material';

export function getMuiMenu(): Components['MuiMenu'] {
  return {
    styleOverrides: {
      paper: {
        '&&': {
          padding: 0,
          borderRadius: 12,

          '&:before': {
            display: 'none',
          },
        },
      },
      list: {
        padding: 0,
      },
    },
  };
}
