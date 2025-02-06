import { Components, paperClasses } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function getMuiPaper(theme: Theme): Components['MuiPaper'] {
  return {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        padding: theme.spacing(6),

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
