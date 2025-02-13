import { Components, filledInputClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiFilledInput(theme: Theme): Components['MuiFilledInput'] {
  return {
    defaultProps: {
      disableUnderline: true,
      fullWidth: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,

        [`&&, &:hover, &:focus, &.${filledInputClasses.focused}`]: {
          background: 'transparent',
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
