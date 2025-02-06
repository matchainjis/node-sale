import { PaletteMode, ThemeOptions } from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { getMuiButton } from 'modules/themes/components/button';
import { getMuiMenu } from 'modules/themes/components/menu';
import { getMuiMenuItem } from 'modules/themes/components/menuItem';
import { getMuiPaper } from 'modules/themes/components/paper';
import { getMuiSelect } from 'modules/themes/components/select';
import { getMuiTypography } from 'modules/themes/components/typography';

import { getMuiCssBaseline } from './components/cssBaseline';
import { BREAKPOINTS, FONT_FAMILY, SHAPE, SPACING } from './const';
import { createPalette } from './palette';

export function createMainTheme(mode: PaletteMode = 'dark') {
  const baseTheme = createMuiTheme({
    palette: createPalette(mode),
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
      MuiButton: getMuiButton(baseTheme),
      MuiSelect: getMuiSelect(baseTheme),
      MuiTypography: getMuiTypography(baseTheme),
      MuiPaper: getMuiPaper(baseTheme),
      MuiMenu: getMuiMenu(),
      MuiMenuItem: getMuiMenuItem(baseTheme),
    },
  };

  return createMuiTheme(deepmerge(baseTheme, options));
}

export const mainTheme = createMainTheme();
