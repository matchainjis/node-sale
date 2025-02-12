import { alpha, Components } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const MENU_ITEM_MIN_WIDTH = 140;

export function getMuiMenuItem(theme: Theme): Components['MuiMenuItem'] {
  return {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 4),
        gap: theme.spacing(2),
        borderRadius: 12,
        minWidth: MENU_ITEM_MIN_WIDTH,
        fontSize: 13,
        fontWeight: 500,
        minHeight: 42,
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: theme.palette.grey[700],

        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.1),
          boxShadow: `inset 0 0 0 2px ${theme.palette.grey[700]}`,
        },
      },
    },
  };
}
