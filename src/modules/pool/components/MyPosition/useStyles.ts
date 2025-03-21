import { makeStyles } from 'tss-react/mui';

import myPositionImage from 'modules/pool/assets/my-position-bg.jpg';

export const useStyles = makeStyles()(theme => ({
  root: {
    minHeight: 116,
    backgroundImage: `url(${myPositionImage})`,
    backgroundSize: 'cover',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttons: {
    display: 'grid',
    gridTemplateColumns:
      'minmax(120px, max-content) minmax(150px, max-content)',
    gap: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}));
