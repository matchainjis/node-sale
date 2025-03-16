import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import ArrowIcon from 'modules/common/icons/arrow-icon.svg?react';
import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { globalTranslation, useTranslation } from 'modules/i18n';
import { AccountDetails } from 'modules/pool/components/AccountDetails/AccountDetails';

import { Details } from '../../components/Details';
import { Stats } from '../../components/Stats';
import { PoolRoutesConfig } from '../../Routes';
import { useStyles } from './useStyles';

export function Pool(): ReactElement {
  const { poolAddress = '' } = PoolRoutesConfig.pool.useParams();
  const { classes } = useStyles();
  const { t, keys } = useTranslation(globalTranslation);

  return (
    <Container className={classes.root}>
      <div className={classes.content}>
        <Button
          className={classes.button}
          color="secondary"
          component={Link}
          size="large"
          to={DashboardRoutesConfig.dashboard.generatePath()}
          variant="outlined"
        >
          <ArrowIcon />

          <span>{t(keys.common.back)}</span>
        </Button>

        <Details poolAddress={poolAddress} />

        <AccountDetails poolAddress={poolAddress} />

        <Stats poolAddress={poolAddress} />
      </div>
    </Container>
  );
}
