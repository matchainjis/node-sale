import { alpha, Components, Theme } from '@mui/material';

import { FONT_FAMILY } from 'modules/themes/const';

import GeneralSansVariableTtf from '../assets/fonts/GeneralSans-Variable.ttf';
import GeneralSansVariableWoff from '../assets/fonts/GeneralSans-Variable.woff';
import GeneralSansVariableWoff2 from '../assets/fonts/GeneralSans-Variable.woff2';

export const getMuiCssBaseline = (
  theme: Theme,
): Components['MuiCssBaseline'] => ({
  styleOverrides: {
    'html, body, #root': {
      minHeight: '100vh',
    },
    html: {
      overflowX: 'hidden',
      overflowY: 'scroll',
      scrollBehavior: 'smooth',
    },
    body: {
      position: 'relative',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      boxSizing: 'border-box',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.2,
      margin: 0,
      padding: 0,
      textRendering: 'optimizeLegibility',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontFeatureSettings: "'cv11' on, 'case' on, 'calt' off",
    },
    a: {
      fontSize: 'inherit',
      textDecoration: 'none',
      transition: `color ${theme.transitions.duration.short}ms`,
    },
    hr: {
      width: '100%',
      borderWidth: '1px 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
    },
    'button, input, optgroup, select, textarea': {
      fontFamily: 'inherit',
      fontSize: '100%',
      lineHeight: 1.1,
      margin: 0,
    },
    '::-moz-focus-inner': { borderStyle: 'none', padding: 0 },

    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    'input[type=number]': {
      MozAppearance: 'textfield',
    },

    'strong, b': {
      fontWeight: 600,
    },
    label: {
      cursor: 'pointer',
    },
    '::selection': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      textShadow: 'none',
      WebkitTextFillColor: theme.palette.primary.contrastText,
    },
    '::-webkit-scrollbar': {
      width: 10,
      height: 10,
    },
    '::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
      margin: 1,
      borderRadius: 10,
      '&:hover': {
        background: alpha(theme.palette.grey[500], 0.5),
      },
    },
    '::-webkit-scrollbar-thumb': {
      background: alpha(theme.palette.grey[700], 0.5),
      borderRadius: 10,
      transition: `background-color ${theme.transitions.duration.short}ms`,
      '&:hover': {
        background: alpha(theme.palette.grey[700], 0.7),
      },
    },
    '@font-face': [
      {
        fontFamily: FONT_FAMILY,
        src: `
              url(${GeneralSansVariableWoff2}) format('woff2'),
              url(${GeneralSansVariableWoff}) format('woff'),
              url(${GeneralSansVariableTtf}) format('truetype')
            `,
        fontWeight: '200 700',
        fontDisplay: 'swap',
        fontStyle: 'normal',
      },
    ],
  },
});
