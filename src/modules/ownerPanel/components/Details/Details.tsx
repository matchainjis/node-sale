import { ReactElement } from 'react';
import { Button, Paper, Typography } from '@mui/material';

import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { useGetNFTTokenQuery } from 'modules/ownerPanel/actions/getNFTToken';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';
import { Addresses } from 'modules/pool/components/Addresses';
import { StatGroup } from 'modules/pool/components/StatGroup';
import { Status } from 'modules/pool/components/Status';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IDetailsProps {
  className?: string;
  poolAddress: string;
}

export function Details({
  className,
  poolAddress,
}: IDetailsProps): ReactElement | null {
  const { t, keys } = useGlobalTranslation(translation);
  const { classes, cx } = useStyles();

  const { data: pool } = useGetPoolQuery({
    address: poolAddress,
  });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });
  const { data: nftToken = '' } = useGetNFTTokenQuery({ poolAddress });

  const { onOpen } = useDialog<string>(KnownDialogs.addSelfstake);

  const { onOpen: onOpenEditPool } = useDialog<string>(KnownDialogs.editPool);

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
        <Typography
          color={theme => theme.palette.text.secondary}
          mt={3}
          variant="body1"
        >
          {poolMeta?.description}
        </Typography>
      )}

      <StatGroup className={classes.stats} poolAddress={poolAddress} />

      <Button size="large" onClick={() => onOpen(poolAddress)}>
        {t(keys.addSelfstake)}
      </Button>

      <Addresses
        className={classes.rows}
        nftAddress={nftToken}
        poolAddress={poolAddress}
      />
    </Paper>
  );
}
