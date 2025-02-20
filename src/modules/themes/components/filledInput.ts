import { alpha, Components, filledInputClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiFilledInput(theme: Theme): Components['MuiFilledInput'] {
  return {
    defaultProps: {
      disableUnderline: true,
      fullWidth: true,
    },
    styleOverrides: {
      root: {
        '&&': {
          background: 'transparent',
          borderRadius: 16,
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.15)}`,
          transition: 'box-shadow 0.3s ease',

          '&:hover': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.text.primary, 0.15)}`,
          },

          [`&:focus, &.${filledInputClasses.focused}`]: {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
          },
        },
      },

      input: {
        fontSize: 36,
        fontWeight: 600,
        padding: theme.spacing(15, 4.5, 4),
        '&&': {
          background: 'transparent',
        },
      },
    },
  };
}
