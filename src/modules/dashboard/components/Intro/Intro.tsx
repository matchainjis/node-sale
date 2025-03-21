import { ReactElement, useMemo } from 'react';
import {
  Button,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { ZERO } from 'modules/common/const';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import {
  EMPTY_POOL_ADDRESSES,
  useGetPoolAddressesQuery,
} from 'modules/pool/actions/getPoolAddresses';
import { EMPTY_POOLS, useGetPoolsQuery } from 'modules/pool/actions/getPools';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import { translation } from './translation';
import { useStyles } from './useStyles';

export function Intro(): ReactElement {
  const { classes, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const { t, keys } = useGlobalTranslation(translation);

  const { onOpen } = useDialog(KnownDialogs.connect);

  const {
    data: poolsAddresses = EMPTY_POOL_ADDRESSES,
    isLoading: isPoolsAddressesLoading,
  } = useGetPoolAddressesQuery();
  const { data: pools = EMPTY_POOLS, isLoading: isPoolsLoading } =
    useGetPoolsQuery(
      {
        addresses: poolsAddresses,
      },
      {
        skip: poolsAddresses.length === 0,
        selectFromResult: mapDataToUndefinedIfSkip,
      },
    );

  const isLoading = isPoolsAddressesLoading || isPoolsLoading;

  const totalStaked = useMemo(
    () => pools.reduce((acc, { tvl }) => acc.plus(tvl), ZERO),
    [pools],
  );

  const { avgAPY } = useGetPoolAPYs();

  const totalStakedContent = (
    isMd ? totalStaked.integerValue() : totalStaked.decimalPlaces(9)
  ).toFormat();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h1">
        {t(keys.title, undefined, true)}
      </Typography>

      <div className={classes.content}>
        <div className={classes.stats}>
          <div className={classes.stat}>
            <Typography variant="h4">
              {isLoading ? <Skeleton /> : totalStakedContent}
            </Typography>

            <Typography className={classes.label} variant="body1">
              {t(keys.total)}
            </Typography>
          </div>

          <div className={classes.divider} />

          <div className={classes.stat}>
            <Typography variant="h4">
              {isLoading ? (
                <Skeleton />
              ) : (
                t(keys.upTo, { apy: avgAPY.decimalPlaces(2).toFormat() })
              )}
            </Typography>

            <Typography className={classes.label} variant="body1">
              {t(keys.apy)}
            </Typography>
          </div>

          <div className={classes.divider} />

          <div className={classes.stat}>
            <Typography variant="h4">
              {isLoading ? (
                <Skeleton animation="wave" variant="text" />
              ) : (
                pools.length
              )}
            </Typography>

            <Typography className={classes.label} variant="body1">
              {t(keys.activeValidators)}
            </Typography>
          </div>
        </div>

        <Button
          fullWidth
          className={classes.button}
          color="info"
          size="large"
          onClick={onOpen}
        >
          {t(keys.common.connectWallet)}
        </Button>
      </div>
    </Paper>
  );
}
