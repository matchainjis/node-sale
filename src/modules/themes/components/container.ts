import { Components, Theme } from '@mui/material';

export const MAX_WIDTH = 1216;

export function getMuiContainer(theme: Theme): Components['MuiContainer'] {
  return {
    styleOverrides: {
      root: {
        '&&': {
          maxWidth: `calc(${MAX_WIDTH}px + ${theme.spacing(16)})`,
          paddingLeft: theme.spacing(8),
          paddingRight: theme.spacing(8),

          [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
        },
      },
    },
  };
}
