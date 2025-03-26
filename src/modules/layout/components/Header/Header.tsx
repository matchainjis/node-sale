import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { Account } from 'modules/layout/components/Account';
import { useGetOwnerPoolAddressesQuery } from 'modules/ownerPanel/actions/getOwnerPoolAddresses';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';

import logoIcon from '../../assets/logo.svg';
import { Menu } from '../Menu';
import { useStyles } from './useStyles';

interface IHeaderProps {
  className?: string;
}

export function Header({ className }: IHeaderProps): ReactElement {
  const { classes, cx, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const [showMenu, setShowMenu] = useState(false);

  const { isConnected } = useConnection();

  const { data: pools = EMPTY_POOL_ADDRESSES } = useGetPoolAddressesQuery();
  const { data: ownerPools } = useGetOwnerPoolAddressesQuery(
    {
      poolAddresses: pools,
    },
    {
      skip: !isConnected,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const isOwnerPools = !!ownerPools?.length;
  const isFullScreenMenu = isMd && showMenu;

  return (
    <div
      className={cx(
        classes.root,
        isFullScreenMenu && classes.menuRoot,
        className,
      )}
    >
      <header className={cx(classes.header, className)}>
        <Link
          className={classes.logoLink}
          to={DashboardRoutesConfig.dashboard.generatePath()}
        >
          <img alt="MATCHSTAKE" className={classes.logo} src={logoIcon} />
        </Link>

        {isOwnerPools && !isMd && <Menu />}

        <Account
          isShowBurger={isOwnerPools}
          showMenu={showMenu}
          onShowMenu={setShowMenu}
        />
      </header>

      {isOwnerPools && isFullScreenMenu && (
        <Menu onClose={() => setShowMenu(false)} />
      )}
    </div>
  );
}
