import { ReactElement } from 'react';
import { Paper } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { ClaimTable } from 'modules/dashboard/components/ClaimTable';
import { useGetAccountPoolQuery } from 'modules/pool/actions/getAccountPool';
import { useGetPoolPendingUnstakesQuery } from 'modules/pool/actions/getPoolPendingUnstakes';
import { FirstDelegate } from 'modules/pool/components/FirstDelegate/FirstDelegate';
import { MyPosition } from 'modules/pool/components/MyPosition/MyPosition';

import { useStyles } from './useStyles';

interface IAccountDetailsProps {
  poolAddress: string;
}

export function AccountDetails({
  poolAddress,
}: IAccountDetailsProps): ReactElement {
  const { classes } = useStyles();

  const { isConnected } = useConnection();

  const { data: accountPool } = useGetAccountPoolQuery(
    { address: poolAddress },
    { skip: !isConnected, selectFromResult: mapDataToUndefinedIfSkip },
  );

  const { data: poolUnstakes } = useGetPoolPendingUnstakesQuery(
    {
      poolAddress,
    },
    {
      skip: !isConnected || !poolAddress,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  const isStakedAmount =
    !!accountPool?.stakedAmount && !accountPool.stakedAmount.isZero();
  const isFistTime = !isConnected || (!isStakedAmount && !poolUnstakes?.length);

  if (isFistTime) {
    return <FirstDelegate poolAddress={poolAddress} />;
  }

  return (
    <Paper className={classes.root}>
      {isStakedAmount && <MyPosition poolAddress={poolAddress} />}

      {!!poolUnstakes?.length && (
        <ClaimTable
          isHidePoolName
          className={classes.table}
          pendingUnstakes={poolUnstakes}
        />
      )}
    </Paper>
  );
}
