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

          [`&.${filledInputClasses.multiline}`]: {
            padding: theme.spacing(0),
          },

          [`&.${filledInputClasses.multiline} textarea`]: {
            lineHeight: 'normal',
            padding: theme.spacing(3, 4, 5),
          },

          [`&.${filledInputClasses.disabled}`]: {
            pointerEvents: 'none',
          },
        },
      },

      input: {
        fontSize: 13,
        fontWeight: 500,
        padding: theme.spacing(3, 4),
        height: 18,

        '&&&&::placeholder': {
          opacity: '0.2 !important',
        },

        [`&.${filledInputClasses.disabled}`]: {
          color: alpha(theme.palette.text.primary, 0.5),
          webkitTextFillColor: 'none',
          '-webkit-text-fill-color': 'inherit',
        },
      },
    },
  };
}
