import { alpha, PaletteOptions } from '@mui/material';

export const mainPalette: PaletteOptions = {
  mode: 'dark',

  primary: {
    main: '#FF6039',
    dark: '#FE2368',
    light: '#E1E9FD',
    contrastText: '#ffffff',
  },

  secondary: {
    main: alpha('#FFF', 0.05),
    dark: alpha('#FFF', 0.05),
    light: alpha('#FFF', 0.01),
    contrastText: '#fff',
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
    contrastText: '#FFFFFF',
  },

  warning: {
    main: '#F0B358',
    dark: '#DCA451',
    light: '#554D42',
    contrastText: '#1F2226',
  },

  success: {
    main: '#4BC99B',
    dark: '#37B788',
    light: '#0F3224',
    contrastText: '#FFFFFF',
  },

  background: {
    default: '#0D0D0D',
    paper: alpha('#FFF', 0.05),
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
    primary: '#fff',
    secondary: alpha('#fff', 0.6),
    disabled: alpha('#0D0D0D', 0.2),
  },

  divider: '#42464F',

  common: {
    black: '#000000',
    white: '#ffffff',
  },
};
