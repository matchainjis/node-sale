import { ReactElement } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

import { ZERO } from 'modules/common/const';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';

import { useGetPoolQuery } from '../../actions/getPool';
import { useGetPoolAPYs } from '../../hooks/useGetPoolAPYs';
import { useGetRank } from '../../hooks/useGetRank';
import { translation } from './translation';
import { useStyles } from './useStyles';

interface IStatGroupProps {
  className?: string;
  poolAddress: string;
}

export function StatGroup({
  className,
  poolAddress,
}: IStatGroupProps): ReactElement {
  const { classes, cx } = useStyles();
  const { t, keys } = useGlobalTranslation(translation);

  const { data: pool, isLoading: isPoolLoading } = useGetPoolQuery({
    address: poolAddress,
  });

  const {
    rank,
    totalRanks,
    isLoading: isRanksLoading,
  } = useGetRank(poolAddress);

  const { poolAPYs, isLoading: isPoolAPYsLoading } = useGetPoolAPYs();

  const poolAvgAPY = poolAPYs[poolAddress] ?? ZERO;
  const isNoRanks = isRanksLoading || rank === 0;

  return (
    <div className={cx(classes.stats, className)}>
      <Box sx={{ minWidth: 'max-content' }}>
        <div className={classes.rank}>
          <Typography component="span" variant="h3">
            {isNoRanks ? (
              <Skeleton width={80} />
            ) : (
              t(keys.rankValue, { rank, totalRanks })
            )}
          </Typography>

          {!isNoRanks && (
            <Typography
              color={theme => theme.palette.text.secondary}
              component="div"
              variant="body1"
            >
              {t(keys.ofRankValue, { totalRanks })}
            </Typography>
          )}
        </div>

        <Typography
          color={theme => theme.palette.text.secondary}
          component="div"
          variant="body1"
        >
          {t(keys.rank)}
        </Typography>
      </Box>

      <div className={classes.columnDivider} />

      <div>
        <Typography variant="h3">
          {isPoolAPYsLoading ? (
            <Skeleton />
          ) : (
            t(keys.unit.percent, { value: poolAvgAPY?.decimalPlaces(2) })
          )}
        </Typography>

        <Typography
          color={theme => theme.palette.text.secondary}
          component="div"
          variant="body1"
        >
          {t(keys.delegationAPY)}
        </Typography>
      </div>

      <div className={classes.columnDivider} />

      <div>
        <Typography variant="h3">
          {isPoolLoading ? (
            <Skeleton />
          ) : (
            t(keys.unit.percent, {
              value: pool?.commission.decimalPlaces(2),
            })
          )}
        </Typography>

        <Typography
          color={theme => theme.palette.text.secondary}
          component="div"
          variant="body1"
        >
          {t(keys.commission)}
        </Typography>
      </div>
    </div>
  );
}
