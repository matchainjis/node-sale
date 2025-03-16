import { ReactElement } from 'react';
import { Box, Button, Paper, Skeleton, Typography } from '@mui/material';

import { ZERO } from 'modules/common/const';
import { useCopyClick } from 'modules/common/hooks/useCopyClick';
import { cropString } from 'modules/common/utils/cropString';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import {
  globalTranslation,
  mergeTranslations,
  useTranslation,
} from 'modules/i18n';
import { useGetNFTTokenQuery } from 'modules/ownerPanel/actions/getNFTToken';
import { useGetRank } from 'modules/ownerPanel/hooks/useGetRank';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { Status } from 'modules/pool/components/Status';
import { useGetPoolAPYs } from 'modules/pool/hooks/useGetPoolAPYs';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IDetailsProps {
  className?: string;
  poolAddress: string;
}

const mergedTranslation = mergeTranslations(globalTranslation, translation);

export function Details({
  className,
  poolAddress,
}: IDetailsProps): ReactElement | null {
  const { t, keys } = useTranslation(mergedTranslation);
  const { classes, cx } = useStyles();

  const { data: pool, isLoading: isPoolLoading } = useGetPoolQuery({
    address: poolAddress,
  });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });
  const { data: nftToken } = useGetNFTTokenQuery({ poolAddress });

  const { poolAPYs, isLoading: isPoolAPYsLoading } = useGetPoolAPYs();

  const poolAvgAPY = poolAPYs[poolAddress] ?? ZERO;

  const { onCopyClick } = useCopyClick();
  const { onOpen } = useDialog<string>(KnownDialogs.addSelfstake);

  const { onOpen: onOpenEditPool } = useDialog<string>(KnownDialogs.editPool);

  const {
    rank,
    totalRanks,
    isLoading: isRanksLoading,
  } = useGetRank(poolAddress);

  if (!pool) {
    return null;
  }

  return (
    <Paper className={cx(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.icon}>
          <img
            alt="Pool logo"
            className={classes.image}
            src={poolMeta?.image}
          />
        </div>

        <Button
          color="secondary"
          size="large"
          variant="outlined"
          onClick={() => onOpenEditPool(poolAddress)}
        >
          {t(keys.edit)}
        </Button>
      </div>

      <div className={classes.title}>
        {poolMeta?.name && (
          <Typography textTransform="uppercase" variant="h2">
            {poolMeta?.name}
          </Typography>
        )}

        <Status status={pool.status} />
      </div>

      {poolMeta?.description && (
        <Typography mt={3} variant="body1">
          {poolMeta?.description}
        </Typography>
      )}

      <div className={classes.stats}>
        <Box className={classes.stat} sx={{ minWidth: 'max-content' }}>
          <Typography variant="h3">
            {isRanksLoading || rank === 0 ? (
              <Skeleton width={80} />
            ) : (
              t(keys.rankValue, { rank, totalRanks })
            )}
          </Typography>

          <Typography variant="body1">{t(keys.rank)}</Typography>
        </Box>

        <div className={classes.columnDivider} />

        <div className={classes.stat}>
          <Typography variant="h3">
            {isPoolAPYsLoading ? (
              <Skeleton />
            ) : (
              t(keys.unit.percent, { value: poolAvgAPY?.decimalPlaces(2) })
            )}
          </Typography>

          <Typography variant="body1">{t(keys.delegationAPY)}</Typography>
        </div>

        <div className={classes.columnDivider} />

        <div className={classes.stat}>
          <Typography variant="h3">
            {isPoolLoading ? (
              <Skeleton />
            ) : (
              t(keys.unit.percent, {
                value: pool.commission.decimalPlaces(2),
              })
            )}
          </Typography>

          <Typography variant="body1">{t(keys.commission)}</Typography>
        </div>
      </div>

      <Button size="large" onClick={() => onOpen(poolAddress)}>
        {t(keys.addSelfstake)}
      </Button>

      <div className={classes.rows}>
        <div className={classes.row}>
          <Typography sx={{ opacity: 0.6 }} variant="body1">
            {t(keys.poolAddress)}
          </Typography>

          <Typography
            className={classes.rowValue}
            component="div"
            variant="body1"
          >
            <span>{cropString(poolAddress, 8)}</span>

            <button
              className={classes.copyButton}
              type="button"
              onClick={() => onCopyClick(poolAddress)}
            >
              {t(keys.copy)}
            </button>
          </Typography>
        </div>

        {nftToken && (
          <>
            <div className={classes.rowDivider} />

            <div className={classes.row}>
              <Typography component="div" sx={{ opacity: 0.6 }} variant="body1">
                {t(keys.nft)}
              </Typography>

              <Typography
                className={classes.rowValue}
                component="div"
                variant="body1"
              >
                <span>{cropString(nftToken, 8)}</span>

                <button
                  className={classes.copyButton}
                  type="button"
                  onClick={() => onCopyClick(nftToken)}
                >
                  {t(keys.copy)}
                </button>
              </Typography>
            </div>
          </>
        )}
      </div>
    </Paper>
  );
}
