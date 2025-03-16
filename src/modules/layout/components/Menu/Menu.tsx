import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';

import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { useTranslation } from 'modules/i18n';
import { OwnerPanelRoutesConfig } from 'modules/ownerPanel/Routes';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IMenuProps {
  className?: string;
  onClose?: () => void;
}

export function Menu({ className, onClose }: IMenuProps): ReactElement | null {
  const { t, keys } = useTranslation(translation);

  const { classes, cx, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        className={classes.link}
        component={NavLink}
        to={DashboardRoutesConfig.dashboard.generatePath()}
        variant={isMd ? 'h1' : 'body1'}
        onClick={isMd ? onClose : undefined}
      >
        {t(keys.delegateStaking)}
      </Typography>

      <Typography
        className={classes.link}
        component={NavLink}
        to={OwnerPanelRoutesConfig.panel.generatePath()}
        variant={isMd ? 'h1' : 'body1'}
        onClick={isMd ? onClose : undefined}
      >
        {t(keys.poolOwnerPanel)}
      </Typography>
    </div>
  );
}
