import { PaletteMode, ThemeOptions } from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import createMuiPalette from '@mui/material/styles/createPalette';
import { deepmerge } from '@mui/utils';

import { getMuiButton } from 'modules/themes/components/button';
import { getMuiChip } from 'modules/themes/components/chip';
import { getMuiContainer } from 'modules/themes/components/container';
import { getMuiFilledInput } from 'modules/themes/components/filledInput';
import { getMuiInputLabel } from 'modules/themes/components/inputLabel';
import { getMuiMenu } from 'modules/themes/components/menu';
import { getMuiMenuItem } from 'modules/themes/components/menuItem';
import { getMuiPaper } from 'modules/themes/components/paper';
import { getMuiSelect } from 'modules/themes/components/select';
import { getMuiSkeleton } from 'modules/themes/components/skeleton';
import { getMuiTextField } from 'modules/themes/components/textField';
import { getMuiTooltip } from 'modules/themes/components/tooltip';
import { getMuiTypography } from 'modules/themes/components/typography';
import { darkPalette } from 'modules/themes/darkPalette';
import { lightPalette } from 'modules/themes/lightPalette';

import { getMuiCssBaseline } from './components/cssBaseline';
import { BREAKPOINTS, FONT_FAMILY, SHAPE, SPACING } from './const';

export function createMainTheme(mode: PaletteMode = 'dark') {
  const baseTheme = createMuiTheme({
    palette: createMuiPalette(mode === 'dark' ? darkPalette : lightPalette),
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
      MuiContainer: getMuiContainer(baseTheme),
      MuiChip: getMuiChip(baseTheme),
      MuiTooltip: getMuiTooltip(baseTheme),
      MuiSkeleton: getMuiSkeleton(),
      MuiTextField: getMuiTextField(),
      MuiInputLabel: getMuiInputLabel(baseTheme),
      MuiFilledInput: getMuiFilledInput(baseTheme),
    },
  };

  return createMuiTheme(deepmerge(baseTheme, options));
}

export const mainTheme = createMainTheme();
