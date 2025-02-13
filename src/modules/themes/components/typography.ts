import { Components, Theme } from '@mui/material';

import { FONT_FAMILY } from '../const';

export function getMuiTypography(theme: Theme): Components['MuiTypography'] {
  return {
    defaultProps: {
      fontFamily: FONT_FAMILY,
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        subtitle1: 'span',
        subtitle2: 'span',
        body1: 'span',
        body2: 'span',
      },
    },
    styleOverrides: {
      root: {
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        fontFeatureSettings: "'ss01' on, 'case' on, 'salt' on, 'calt' off",
        lineHeight: 'normal',
        fontStyle: 'normal',
        fontWeight: 500,
      },

      h1: {
        fontWeight: 600,
        fontSize: 36,

        [theme.breakpoints.down('md')]: {
          fontSize: 24,
        },
      },

      h2: {
        fontWeight: 600,
        fontSize: 30,

        [theme.breakpoints.down('md')]: {
          fontSize: 21,
        },
      },

      h3: {
        fontWeight: 600,
        fontSize: 24,

        [theme.breakpoints.down('md')]: {
          fontSize: 18,
        },
      },

      h4: {
        fontWeight: 600,
        fontSize: 21,

        [theme.breakpoints.down('md')]: {
          fontSize: 18,
        },
      },

      h5: {
        fontSize: 15,
        fontWeight: 600,
      },

      body1: {
        fontSize: 13,
      },

      body2: {
        fontSize: 12,
      },

      subtitle2: {
        fontSize: 10,
        fontWeight: 500,
      },
    },
  };
}
