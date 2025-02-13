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
        backdropFilter: 'blur(10px)',
        position: 'relative',

        '&:before': {
          display: isDarkTheme ? 'block' : 'none',
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 18,
          padding: 1,
          background: `linear-gradient(90deg, ${theme.palette.secondary.light}, transparent 100%)`,
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
        },

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
