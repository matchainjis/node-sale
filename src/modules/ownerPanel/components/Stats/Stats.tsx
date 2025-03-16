import { ReactElement, useMemo } from 'react';
import { Paper, Skeleton, Typography } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { TextButton } from 'modules/common/components/TextButton/TextButton';
import { ZERO } from 'modules/common/const';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';
import { useGetAvailableSelfStakeAmountQuery } from 'modules/ownerPanel/actions/getSelfStakeAmount';
import { StatContent } from 'modules/ownerPanel/components/StatContent/StatContent';
import { useGetAccountPoolQuery } from 'modules/pool/actions/getAccountPool';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IStatsProps {
  poolAddress: string;
}

export function Stats({ poolAddress }: IStatsProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes, cx } = useStyles();

  const { onOpen } = useDialog<string>(KnownDialogs.withdraw);

  const { isConnected } = useConnection();
  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const { data: accountPool } = useGetAccountPoolQuery(
    { address: poolAddress },
    { skip: !isConnected, selectFromResult: mapDataToUndefinedIfSkip },
  );

  const { data: selfStakeAmount } = useGetAvailableSelfStakeAmountQuery(
    { poolAddress },
    { skip: !isConnected, selectFromResult: mapDataToUndefinedIfSkip },
  );

  const lockedAmount = useMemo(
    () => accountPool?.stakedAmount?.minus(selfStakeAmount ?? ZERO),
    [accountPool, selfStakeAmount],
  );

  const delegationsAmount = useMemo(
    () => pool?.tvl?.minus(selfStakeAmount ?? ZERO),
    [pool?.tvl, selfStakeAmount],
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.tvlStat}>
        <StatContent amount={pool?.tvl} label={t(keys.tvl)} />
      </Paper>

      <Paper className={classes.multiStats}>
        <StatContent
          amount={accountPool?.stakedAmount}
          className={classes.topSubStat}
          label={t(keys.selfStaked)}
        />

        <StatContent
          amount={lockedAmount}
          className={classes.subStat}
          label={t(keys.locked)}
          variant="h5"
        />

        <StatContent
          amount={selfStakeAmount}
          buttonSlot={
            <TextButton onClick={() => onOpen(poolAddress)}>
              {t(keys.withdraw)}
            </TextButton>
          }
          className={classes.subStat}
          label={t(keys.unlocked)}
          variant="h5"
        />
      </Paper>

      <Paper className={classes.multiStats}>
        <StatContent
          amount={delegationsAmount}
          className={classes.topSubStat}
          label={t(keys.delegations)}
        />

        <div className={cx(classes.subStat, classes.subItem)}>
          <Typography sx={{ opacity: 0.6, fontWeight: 600 }} variant="body1">
            {t(keys.delegators)}
          </Typography>

          <Typography variant="h5">
            {pool?.totalDelegators.toFormat() || <Skeleton />}
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
