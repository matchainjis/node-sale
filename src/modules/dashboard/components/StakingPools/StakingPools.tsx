import { ReactElement } from 'react';
import { Typography } from '@mui/material';

import { BorderedPaper } from 'modules/common/components/BorderedPaper';
import { PoolTable } from 'modules/dashboard/components/PoolTable';
import { useTranslation } from 'modules/i18n';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { useGetPoolsQuery } from 'modules/pool/actions/getPools';

import { translation } from './translation';
import { useStyles } from './useStyles';

export function StakingPools(): ReactElement {
  const { classes } = useStyles();
  const { t, keys } = useTranslation(translation);
  const { data: addresses = EMPTY_POOL_ADDRESSES } = useGetPoolAddressesQuery();

  const { data: pools } = useGetPoolsQuery({ addresses });

  return (
    <BorderedPaper className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title} component="h2" variant="h5">
          {t(keys.title)}
        </Typography>

        {pools?.length ? <PoolTable poolAddresses={addresses} /> : undefined}
      </div>
    </BorderedPaper>
  );
}
