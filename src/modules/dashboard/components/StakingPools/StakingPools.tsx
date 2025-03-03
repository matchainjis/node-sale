import { ReactElement } from 'react';
import { Paper, Typography } from '@mui/material';

import { PoolTable } from 'modules/dashboard/components/PoolTable';
import { useTranslation } from 'modules/i18n';
import { useGetPoolAddressesQuery } from 'modules/pool/actions/getPoolAddresses';
import { useGetPoolsQuery } from 'modules/pool/actions/getPools';

import { translation } from './translation';
import { useStyles } from './useStyles';

const EMPTY_POOLS: string[] = [];
export function StakingPools(): ReactElement {
  const { classes } = useStyles();
  const { t, keys } = useTranslation(translation);
  const { data: addresses = EMPTY_POOLS } = useGetPoolAddressesQuery();

  const { data: pools } = useGetPoolsQuery({ addresses });

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title} component="h2" variant="h5">
          {t(keys.title)}
        </Typography>

        {pools?.length ? <PoolTable poolAddresses={addresses} /> : undefined}
      </div>
    </Paper>
  );
}
