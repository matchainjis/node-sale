import { alpha, chipClasses, Components, Theme } from '@mui/material';

export function getMuiChip(theme: Theme): Components['MuiChip'] {
  return {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(10px)',
        fontWeight: 500,
      },

      colorSecondary: {
        background: theme.palette.secondary.main,
        color: alpha(theme.palette.text.primary, 0.6),

        '&:before': {
          content: '""',
          position: 'absolute',
          inset: '0',
          padding: 1,
          borderRadius: 16,
          background: `linear-gradient(90deg, ${theme.palette.secondary.light}, transparent 100%)`,
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',

          [`${chipClasses.sizeSmall}`]: {
            borderRadius: 10,
          },

          [`${chipClasses.sizeMedium}`]: {
            borderRadius: 16,
          },
        },
      },

      sizeSmall: {
        height: 24,
        padding: theme.spacing(0, 2),
        borderRadius: 10,
        fontSize: 11,
      },

      sizeMedium: {
        height: 30,
        padding: theme.spacing(0, 2.25),
        borderRadius: 16,
        fontSize: 13,
      },

      label: {
        padding: 0,
      },
    },
  };
}
