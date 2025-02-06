import { ThemeOptions } from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import createPalette from '@mui/material/styles/createPalette';
import { deepmerge } from '@mui/utils';

import { getMuiCssBaseline } from './components/cssBaseline';
import { BREAKPOINTS, FONT_FAMILY, SHAPE, SPACING } from './const';
import { mainPalette } from './palette';

export function createMainTheme() {
  const baseTheme = createMuiTheme({
    palette: createPalette(mainPalette),
    spacing: SPACING,
    breakpoints: {
      values: BREAKPOINTS,
    },
    typography: {
      fontFamily: FONT_FAMILY,
    },
    shape: SHAPE,
  });

  const options: ThemeOptions = {
    components: {
      MuiCssBaseline: getMuiCssBaseline(baseTheme),
    },
  };

  return createMuiTheme(deepmerge(baseTheme, options));
}

export const mainTheme = createMainTheme();
