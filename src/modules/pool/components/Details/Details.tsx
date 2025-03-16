import { ReactElement } from 'react';
import { Paper, Skeleton, Typography } from '@mui/material';

import { useGetNFTTokenQuery } from 'modules/ownerPanel/actions/getNFTToken';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { Addresses } from 'modules/pool/components/Addresses';
import { StatGroup } from 'modules/pool/components/StatGroup';
import { Status } from 'modules/pool/components/Status';

import { useStyles } from './useStyles';

interface IDetailsProps {
  className?: string;
  poolAddress: string;
}

export function Details({
  className,
  poolAddress,
}: IDetailsProps): ReactElement | null {
  const { classes, cx } = useStyles();

  const { data: pool } = useGetPoolQuery({
    address: poolAddress,
  });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });
  const { data: nftToken = '' } = useGetNFTTokenQuery({ poolAddress });

  return (
    <Paper className={cx(classes.root, className)}>
      <div className={classes.content}>
        <div className={classes.icon}>
          <img
            alt="Pool logo"
            className={classes.image}
            src={poolMeta?.image}
          />
        </div>

        <div className={classes.title}>
          <Typography textTransform="uppercase" variant="h2">
            {poolMeta?.name || <Skeleton width={300} />}
          </Typography>

          {pool?.status && <Status status={pool.status} />}
        </div>

        <StatGroup className={classes.stats} poolAddress={poolAddress} />
      </div>

      <div className={classes.divider} />

      <div className={classes.content}>
        <Typography
          color={theme => theme.palette.text.secondary}
          component="div"
          variant="body1"
          width="100%"
        >
          {poolMeta?.description || (
            <Skeleton sx={{ width: '100%', maxWidth: '100%', height: 50 }} />
          )}
        </Typography>

        <Addresses
          className={classes.rows}
          nftAddress={nftToken}
          poolAddress={poolAddress}
        />
      </div>
    </Paper>
  );
}
