import { alpha, PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: '#FF6039',
    dark: '#FE2368',
    light: '#E1E9FD',
    contrastText: '#0D0D0D',
  },

  secondary: {
    main: alpha('#FFF', 0.05),
    dark: alpha('#FFF', 0.05),
    light: alpha('#FFF', 0.1),
    contrastText: '#0D0D0D',
  },

  info: {
    main: '#FFFFFF',
    dark: '#CFCFCF',
    light: '#E7E7E7',
    contrastText: '#0D0D0D',
  },

  error: {
    main: '#EC5478',
    dark: '#350C15',
    light: '#C8294E',
    contrastText: '#0D0D0D',
  },

  warning: {
    main: alpha('#FF8020', 0.15),
    dark: alpha('#FF8020', 0.15),
    light: alpha('#FF8020', 0.15),
    contrastText: '#FF8020',
  },

  success: {
    main: alpha('#23FF70', 0.15),
    dark: alpha('#23FF70', 0.15),
    light: alpha('#23FF70', 0.15),
    contrastText: '#23FF70',
  },

  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },

  grey: {
    100: '#42464F',
    200: '#535863',
    300: '#BFC6D0',
    400: '#A7AFC0',
    500: '#9AA1B0',
    600: '#82899A',
    700: '#585E6B',
    800: '#9AA1B0',
    900: '#FFFFFF',
  },

  text: {
    primary: '#0D0D0D',
    secondary: alpha('#0D0D0D', 0.6),
    disabled: alpha('#FFF', 0.2),
  },

  divider: '#0D0D0D',

  common: {
    black: '#000000',
    white: '#ffffff',
  },
};
