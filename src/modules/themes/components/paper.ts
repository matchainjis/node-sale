import { Components, paperClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiPaper(theme: Theme): Components['MuiPaper'] {
  const isDarkTheme = theme.palette.mode === 'dark';
  return {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(6),
        background: isDarkTheme
          ? theme.palette.secondary.main
          : theme.palette.common.white,
        border: 'none',
        color: theme.palette.text.primary,

        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(6, 4.5),
        },

        [`&.${paperClasses.rounded}`]: {
          borderRadius: 18,
        },
      },
    },
  };
}
