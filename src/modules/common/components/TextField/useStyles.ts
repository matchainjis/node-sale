import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {},

  label: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },

  rightLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },

  rightTopLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  link: {
    zIndex: 1,
    background: `linear-gradient(98deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 100%)`,

    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
}));
