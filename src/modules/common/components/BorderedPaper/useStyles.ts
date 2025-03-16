import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  root: {
    border: 'none',
    backdropFilter: 'blur(10px)',
    position: 'relative',

    '&:before': {
      display: 'block',
      content: '""',
      position: 'absolute',
      inset: '0',
      borderRadius: 18,
      padding: 1,
      background: `linear-gradient(90deg, ${theme.palette.secondary.light}, transparent 100%)`,
      mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      maskComposite: 'exclude',
    },
  },
}));
