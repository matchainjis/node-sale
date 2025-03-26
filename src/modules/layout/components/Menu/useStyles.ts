import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(5),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: '100vw',
      flex: 1,
    },
  },
  link: {
    textTransform: 'uppercase',
    position: 'relative',

    '&, &:active, &:focus': {
      color: theme.palette.text.primary,
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: '100%',
      height: 1,
      background: 'transparent',
    },

    '&.active, &:hover': {
      background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      '&:after': {
        background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
      },
    },
  },

  active: {
    background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',

    '&:after': {
      background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,
    },
  },
}));
