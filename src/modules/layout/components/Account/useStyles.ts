import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const MIN_BUTTON_WIDTH = 140;

export const useStyles = makeStyles()(theme => ({
  root: {
    background: 'none',
    boxShadow: 'none',
    minHeight: 36,
    minWidth: MIN_BUTTON_WIDTH,

    '&:before, &:after': {
      borderBottom: 'none',
    },
  },

  select: {
    '&&': {
      minHeight: 36,
      borderRadius: 16,
      height: 36,
      padding: theme.spacing(0, 4),
      fontSize: 13,
      lineHeight: 1.5,
      fontWeight: 600,
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',

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
        borderBottom: 'none',
      },

      '&:before, &:after': {
        content: '""',
        borderBottom: 'none',
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
}));
