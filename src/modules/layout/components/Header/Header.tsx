import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { Account } from 'modules/layout/components/Account';

import logoIcon from '../../assets/logo.svg';
import { useStyles } from './useStyles';

interface IHeaderProps {
  className?: string;
}

export function Header({ className }: IHeaderProps): ReactElement {
  const { classes, cx } = useStyles();

  return (
    <header className={cx(classes.root, className)}>
      <Link
        className={classes.logoLink}
        to={DashboardRoutesConfig.dashboard.generatePath()}
      >
        <img alt="MATCHSTAKE" className={classes.logo} src={logoIcon} />
      </Link>

      <Account />
    </header>
  );
}
