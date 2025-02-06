import { Components } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiSelect(theme: Theme): Components['MuiSelect'] {
  return {
    defaultProps: {
      IconComponent: () => undefined,
    },
    styleOverrides: {
      root: {
        '&:before, &:after': {
          display: 'none',
        },
      },

      select: {
        color: theme.palette.text.primary,
        width: '100%',
        height: '100%',
        fontSize: 13,
        lineHeight: 1.5,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',

        '&&': {
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: theme.spacing(4),
          paddingLeft: theme.spacing(4),
        },
      },

      icon: {
        color: theme.palette.text.secondary,
      },
    },
  };
}
