import { ReactElement } from 'react';
import { Container } from '@mui/material';

import { useConnection } from 'modules/auth/hooks/useConnection';

import { Intro } from '../../components/Intro';
import { StakingPools } from '../../components/StakingPools';
import { Stats } from '../../components/Stats';
import { useStyles } from './useStyles';

export function Dashboard(): ReactElement {
  const { isConnected } = useConnection();
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      {isConnected ? <Stats /> : <Intro />}

      <StakingPools />
    </Container>
  );
}
