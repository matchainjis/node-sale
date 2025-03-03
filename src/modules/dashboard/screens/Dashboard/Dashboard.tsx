import { ReactElement } from 'react';
import { Container } from '@mui/material';

import { useConnection } from 'modules/auth/hooks/useConnection';
import { AccountPools } from 'modules/dashboard/components/AccountPools';
import { DelegateDialog } from 'modules/delegate/components/DelegateDialog';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { WithdrawDialog } from 'modules/withdraw/components/WithdrawDialog';

import { Intro } from '../../components/Intro';
import { StakingPools } from '../../components/StakingPools';
import { Stats } from '../../components/Stats';
import { useStyles } from './useStyles';

export function Dashboard(): ReactElement {
  const { isConnected } = useConnection();
  const { classes } = useStyles();

  const { isOpened: isDelegateOpened } = useDialog<string>(
    KnownDialogs.delegate,
  );

  const { isOpened: isWithdrawOpened } = useDialog<string>(
    KnownDialogs.withdraw,
  );

  return (
    <Container className={classes.root}>
      {isConnected ? <Stats /> : <Intro />}

      {isConnected && <AccountPools />}

      <StakingPools />

      {isDelegateOpened && <DelegateDialog />}

      {isWithdrawOpened && <WithdrawDialog />}
    </Container>
  );
}
