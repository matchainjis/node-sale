import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { DashboardRoutesConfig } from 'modules/dashboard/Routes';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useGetIsOwnerPoolQuery } from 'modules/ownerPanel/actions/isPoolOwner';
import { AddSelfStakeDialog } from 'modules/ownerPanel/components/AddSelfstakeDialog/AddSelfStakeDialog';
import { EditPoolDialog } from 'modules/ownerPanel/components/EditPoolDialog';
import { OwnerPanelRoutesConfig } from 'modules/ownerPanel/Routes';
import { Stats } from 'modules/pool/components/Stats';

import { Details } from '../../components/Details';
import { useStyles } from './useStyles';

export function Pool(): ReactElement {
  const { classes } = useStyles();

  const { isConnected } = useConnection();
  const { isOpened } = useDialog(KnownDialogs.addSelfstake);
  const { poolAddress } = OwnerPanelRoutesConfig.pool.useParams();

  const { data: isOwnerPool } = useGetIsOwnerPoolQuery(
    { poolAddress },
    {
      skip: !isConnected || !poolAddress,
      selectFromResult: mapDataToUndefinedIfSkip,
    },
  );

  if (!poolAddress || (typeof isOwnerPool === 'boolean' && !isOwnerPool)) {
    return <Navigate to={DashboardRoutesConfig.dashboard.generatePath()} />;
  }

  return (
    <Container className={classes.root}>
      <Details className={classes.details} poolAddress={poolAddress} />

      <Stats showDialogButtons poolAddress={poolAddress} />

      <EditPoolDialog />

      {isOpened && <AddSelfStakeDialog />}
    </Container>
  );
}
