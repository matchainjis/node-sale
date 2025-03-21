import { ReactElement } from 'react';
import { Button, Paper, Typography } from '@mui/material';

import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useGlobalTranslation } from 'modules/i18n/hooks/useGlobalTranslation';
import { useGetPoolQuery } from 'modules/pool/actions/getPool';
import { useGetPoolMetaQuery } from 'modules/pool/actions/getPoolMeta';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IFirstDelegateProps {
  poolAddress: string;
}

export function FirstDelegate({
  poolAddress,
}: IFirstDelegateProps): ReactElement | null {
  const { t, keys } = useGlobalTranslation(translation);
  const { classes } = useStyles();

  const { data: pool } = useGetPoolQuery({ address: poolAddress });
  const { data: poolMeta } = useGetPoolMetaQuery({ address: poolAddress });

  const { onOpen } = useDialog<string>(KnownDialogs.delegate);

  if (!pool) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.rows}>
        <Typography fontWeight={600} variant="body1">
          {t(keys.title, {
            token: t(keys.tokens.main),
            poolName: poolMeta?.name || poolAddress,
          })}
        </Typography>

        <Typography
          color={theme => theme.palette.text.secondary}
          variant="body1"
        >
          {t(keys.description)}
        </Typography>
      </div>

      <Button
        className={classes.button}
        size="large"
        onClick={() => onOpen(poolAddress)}
      >
        {t(keys.delegate)}
      </Button>
    </Paper>
  );
}
