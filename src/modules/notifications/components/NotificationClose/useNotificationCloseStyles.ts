import { makeStyles } from 'tss-react/mui';

export const useNotificationCloseStyles = makeStyles()(theme => ({
  root: {
    border: 'none',
    fontSize: 14,
    color: 'inherit',
    transition: 'color 0.2s',
    padding: theme.spacing(1),

    '&:hover': {
      color: 'inherit',
      backgroundColor: 'transparent',
    },
  },

  placementTopRight: {
    margin: theme.spacing(-1.25, -1.25, -1, 0),
  },

  icon: {
    width: 18,
    height: 18,
    fontSize: 20,
  },
}));
