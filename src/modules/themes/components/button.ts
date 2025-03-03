import { alpha, buttonClasses, Components, Theme } from '@mui/material';

export const getMuiButton = (theme: Theme): Components['MuiButton'] => ({
  defaultProps: {
    variant: 'contained',
    disableRipple: true,
  },

  styleOverrides: {
    root: {
      textTransform: 'none',
      fontFeatureSettings: "'case' on, 'cv11' on, 'calt' off",
      boxShadow: 'none',
      gap: theme.spacing(1.5),
      transition: 'all 0.2s ease-in-out',

      '& svg': {
        color: 'inherit',
      },

      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
            border: 'none',
            color: theme.palette.text.primary,
            backdropFilter: 'blur(10px)',
            position: 'relative',

            '&:before': {
              zIndex: -1,
              content: '""',
              position: 'absolute',
              inset: '0',
              borderRadius: 15,
              left: 2,
              top: 2,
              width: 'calc(100% - 4px)',
              height: 'calc(100% - 4px)',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: alpha(theme.palette.background.default, 0.6),
            },

            '&:hover, &:active': {
              border: 'none',

              '&:before': {
                backgroundColor: alpha(theme.palette.background.default, 0.4),
              },
            },

            '&:focus': {
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,

              '&:before': {
                backgroundColor: alpha(theme.palette.background.default, 0.6),
              },
            },

            '&.Mui-disabled': {
              border: 'none',
              color: alpha(theme.palette.secondary.contrastText, 0.2),
              background: `linear-gradient(90deg, ${alpha(theme.palette.primary.dark, 0.2)}, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            background: theme.palette.secondary.main,
            border: 'none',
            color: theme.palette.text.primary,
            backdropFilter: 'blur(10px)',
            position: 'relative',

            '&:before': {
              content: '""',
              position: 'absolute',
              inset: '0',
              borderRadius: 16,
              padding: 1,
              background: `linear-gradient(90deg, ${theme.palette.secondary.light}, transparent 100%)`,
              mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              maskComposite: 'exclude',
            },

            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              border: 'none',

              '&:before': {
                background: `linear-gradient(90deg, ${alpha('#FFF', 0.2)}, transparent 100%)`,
              },
            },

            '&:active, &:focus, &.Mui-disabled': {
              border: 'none',
              backgroundColor: theme.palette.secondary.dark,

              '&:before': {
                background: `linear-gradient(90deg, transparent, ${alpha('#FFF', 0.2)})`,
              },
            },

            '&.Mui-disabled': {
              color: alpha(theme.palette.secondary.contrastText, 0.2),
            },
          },
        },

        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
            color: theme.palette.common.white,

            '&:hover': {
              background: `linear-gradient(0deg, ${alpha(theme.palette.common.white, 0.15)} 0%, ${alpha(theme.palette.common.white, 0.15)} 100%), linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
            },

            '&&:active, &&:focus': {
              background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
              color: theme.palette.common.white,
              border: 0,
              boxShadow: 'none',
            },

            '&&.Mui-disabled': {
              background: `linear-gradient(98deg, ${alpha(theme.palette.primary.dark, 0.2)}, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
              color: theme.palette.common.white,
            },
          },
        },
      ],
    },

    sizeMedium: {
      height: 36,
      minHeight: 36,
      padding: theme.spacing(0, 4),
      borderRadius: 16,
      fontSize: 13,
      lineHeight: 1.5,
      fontWeight: 600,
    },

    sizeLarge: {
      height: 42,
      minHeight: 42,
      padding: theme.spacing(0, 6),
      borderRadius: 16,
      fontSize: 13,
      lineHeight: 'normal',
      fontWeight: 600,
    },

    contained: {
      '&:hover': {
        boxShadow: 'none',
      },

      '&:active, &:focus': {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.5)}`,
      },

      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[400],
      },
    },
  },
});
