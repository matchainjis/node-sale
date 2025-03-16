import { ReactElement } from 'react';
import { Button, Paper, Typography } from '@mui/material';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { useGetAccountPoolQuery } from 'modules/pool/actions/getAccountPool';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IMyPositionProps {
  poolAddress: string;
}

export function MyPosition({ poolAddress }: IMyPositionProps): ReactElement {
  const { classes } = useStyles();
  const { t, keys } = useGlobalTranslation(translation);

  const { isConnected } = useConnection();
  const { data: accountPool } = useGetAccountPoolQuery(
    { address: poolAddress },
    { skip: !isConnected, selectFromResult: mapDataToUndefinedIfSkip },
  );

  const { onOpen: onDelegateOpen } = useDialog<string>(KnownDialogs.delegate);
  const { onOpen: onWithdrawOpen } = useDialog<string>(KnownDialogs.withdraw);

  return (
    <Paper className={classes.root}>
      <div>
        <Typography fontWeight={600} variant="body1">
          {t(keys.title)}
        </Typography>

        {accountPool?.stakedAmount && (
          <Typography fontSize={24} mt={1} variant="h3">
            {t(keys.unit.tokenValue, {
              value: accountPool?.stakedAmount.decimalPlaces(6).toFormat(),
              token: t(keys.tokens.main),
            })}
          </Typography>
        )}
      </div>

      <div className={classes.buttons}>
        <Button
          color="info"
          size="large"
          variant="outlined"
          onClick={() => onWithdrawOpen(poolAddress)}
        >
          {t(keys.withdraw)}
        </Button>

        <Button
          color="info"
          size="large"
          onClick={() => onDelegateOpen(poolAddress)}
        >
          {t(keys.delegateMore)}
        </Button>
      </div>
    </Paper>
  );
}
