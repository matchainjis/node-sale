import { ReactElement, useMemo } from 'react';
import { Chip, Paper, Skeleton, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { useGetMainTokenBalanceQuery } from 'modules/api/actions/getMainTokenBalance';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { DEFAULT_DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { globalTranslation, mergeTranslations } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useGetAccountTotalStaked } from 'modules/pool/hooks/useGetAccountTotalStaked';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import buyMoreImage from '../../assets/buy-more.svg';
import { translation } from './translation';
import { useStyles } from './useStyles';

const USD_AMOUNT_MOCK: BigNumber | undefined = undefined;
const BUY_MORE_LINK = '';

const mergedTranslation = mergeTranslations(globalTranslation, translation);

export function Stats(): ReactElement {
  const { classes, cx } = useStyles();
  const { t, keys } = useTranslation(mergedTranslation);

  const { isConnected } = useConnection();
  const {
    data: mainTokenBalance = ZERO,
    isLoading: isMainTokenBalanceLoading,
  } = useGetMainTokenBalanceQuery(undefined, { skip: !isConnected });

  const {
    totalStakedAmount: accountTotalStakedAmount,
    isLoading: isAccountTotalStakedLoading,
  } = useGetAccountTotalStaked();
  const { avgAPY, isLoading: isAPYLoading } = useGetPoolAPYs();

  const annualEarning = useMemo(
    () => accountTotalStakedAmount.multipliedBy(avgAPY),
    [accountTotalStakedAmount, avgAPY],
  );

  return (
    <div className={classes.root}>
      <Paper className={cx(classes.card, classes.myStakedCard)}>
        <Typography alignSelf="center" fontWeight={600} variant="body1">
          {t(keys.myStaked, { token: t(keys.tokens.main) })}
        </Typography>

        <div className={classes.amount}>
          <Typography variant="h3">
            {isAccountTotalStakedLoading ? (
              <Skeleton />
            ) : (
              accountTotalStakedAmount
                .decimalPlaces(DEFAULT_DECIMAL_PLACES)
                .toFormat()
            )}
          </Typography>

          {USD_AMOUNT_MOCK && (
            <Typography variant="body1">
              {t(keys.unit.$, {
                value: USD_AMOUNT_MOCK.decimalPlaces(2).toFormat(),
              })}
            </Typography>
          )}
        </div>
      </Paper>

      <Paper className={cx(classes.card, classes.commonCard)}>
        <Typography className={classes.label} variant="body1">
          {t(keys.annualEarning, { token: t(keys.tokens.main) })}
        </Typography>

        <Chip
          color="secondary"
          label={t(keys.apy, { apy: avgAPY.decimalPlaces(2).toFormat() })}
        />

        <div className={classes.amount}>
          <Typography variant="h3">
            {isAccountTotalStakedLoading || isAPYLoading ? (
              <Skeleton />
            ) : (
              annualEarning.decimalPlaces(DEFAULT_DECIMAL_PLACES).toFormat()
            )}
          </Typography>

          {USD_AMOUNT_MOCK && (
            <Typography variant="body1">
              {t(keys.unit.$, {
                value: USD_AMOUNT_MOCK.decimalPlaces(2).toFormat(),
              })}
            </Typography>
          )}
        </div>
      </Paper>

      <Paper className={cx(classes.card, classes.commonCard)}>
        <Typography className={classes.label} variant="body1">
          {t(keys.availableToStake, { token: t(keys.tokens.main) })}
        </Typography>

        {BUY_MORE_LINK && (
          <a
            className={classes.link}
            href={BUY_MORE_LINK}
            rel="noreferrer"
            target="_blank"
          >
            <img alt={t(keys.buyMore)} src={buyMoreImage} />
          </a>
        )}

        <div className={classes.amount}>
          <Typography variant="h3">
            {isMainTokenBalanceLoading ? (
              <Skeleton />
            ) : (
              mainTokenBalance.decimalPlaces(DEFAULT_DECIMAL_PLACES).toFormat()
            )}
          </Typography>

          {USD_AMOUNT_MOCK && (
            <Typography variant="body1">
              {t(keys.unit.$, {
                value: USD_AMOUNT_MOCK.decimalPlaces(2).toFormat(),
              })}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
}
