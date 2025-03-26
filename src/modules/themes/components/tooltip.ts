import { Components, Theme } from '@mui/material';

export function getMuiTooltip(theme: Theme): Components['MuiTooltip'] {
  return {
    styleOverrides: {
      tooltip: {
        backgroundColor: theme.palette.grey[700],
        borderRadius: 12,
        color: theme.palette.text.primary,
        padding: theme.spacing(3, 4),
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '20px',
      },
    },
  };
}
