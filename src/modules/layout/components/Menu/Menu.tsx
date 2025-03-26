import { ReactElement, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';

import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { useTranslation } from 'modules/i18n';
import { OwnerPanelRoutesConfig } from 'modules/ownerPanel/Routes';
import { PoolRoutesConfig } from 'modules/pool/Routes';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IMenuProps {
  className?: string;
  onClose?: () => void;
}

const DELEGATE_STAKING_PATHS = [PoolRoutesConfig.pool.path];

export function Menu({ className, onClose }: IMenuProps): ReactElement | null {
  const { t, keys } = useTranslation(translation);

  const { classes, cx, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const location = useLocation();

  const isDelegateStaking = useMemo(() => {
    return DELEGATE_STAKING_PATHS.find(path =>
      location.pathname.startsWith(path),
    );
  }, [location.pathname]);

  return (
    <div className={cx(classes.root, className)}>
      <Typography
        className={cx(classes.link, isDelegateStaking && classes.active)}
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
