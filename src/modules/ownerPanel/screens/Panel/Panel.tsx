import { ReactElement } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { BorderedPaper } from 'modules/common/components/BorderedPaper';
import { PoolTable } from 'modules/dashboard/components/PoolTable';
import { translation } from 'modules/dashboard/components/StakingPools/translation';
import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { useTranslation } from 'modules/i18n';
import { useGetOwnerPoolAddressesQuery } from 'modules/ownerPanel/actions/getOwnerPoolAddresses';
import { OwnerPanelRoutesConfig } from 'modules/ownerPanel/Routes';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';

import { useStyles } from './useStyles';

export function Panel(): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { isConnected } = useConnection();

  const {
    data: poolAddresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: ownerPools, isLoading: isOwnerPoolsLoading } =
    useGetOwnerPoolAddressesQuery(
      {
        poolAddresses,
      },
      {
        skip: !isConnected,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const isLoading = isPoolAddressesLoading || isOwnerPoolsLoading;
  const isOwnerPools = !!ownerPools?.length;

  if (!isConnected || (!isOwnerPools && !isLoading)) {
    return <Navigate to={DashboardRoutesConfig.dashboard.generatePath()} />;
  }

  if (ownerPools?.length === 1) {
    const [poolAddress] = ownerPools;

    return (
      <Navigate to={OwnerPanelRoutesConfig.pool.generatePath(poolAddress)} />
    );
  }

  return (
    <Container>
      <BorderedPaper className={classes.root}>
        <div className={classes.content}>
          <Typography component="h2" textTransform="uppercase" variant="h5">
            {t(keys.title)}
          </Typography>

          {isOwnerPools ? (
            <PoolTable
              showDelegated
              poolAddresses={ownerPools}
              onPoolClick={poolAddress =>
                navigate(OwnerPanelRoutesConfig.pool.generatePath(poolAddress))
              }
            />
          ) : undefined}
        </div>
      </BorderedPaper>
    </Container>
  );
}
