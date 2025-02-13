import { Components, inputLabelClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiInputLabel(theme: Theme): Components['MuiInputLabel'] {
  return {
    defaultProps: {},
    styleOverrides: {
      root: {
        fontSize: 13,
        fontWeight: 600,
        width: '100%',
        height: '100%',
        maxWidth: '100%',

        '&': {
          left: 0,
          top: 0,
          padding: theme.spacing(4, 4.5),
        },

        [`&, &.${inputLabelClasses.focused}`]: {
          color: theme.palette.text.primary,
        },
      },
      filled: {
        transform: 'none',
        top: theme.spacing(4),
        left: theme.spacing(4.5),
      },
      animated: {
        transform: 'none',
      },
    },
  };
}
