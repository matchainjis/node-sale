import { ReactElement } from 'react';
import { Button, CircularProgress, useMediaQuery } from '@mui/material';

import { Table } from 'modules/common/components/Table';
import { TableCellProps } from 'modules/common/components/Table/TableCell';
import { useTranslation } from 'modules/i18n';
import { useClaim } from 'modules/pool/hooks/useClaim';
import { useIsClaimable } from 'modules/pool/hooks/useIsClaimable';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IActionsCellProps extends TableCellProps {
  poolAddress: string;
  executedAt: Date;
}

export function UnlockClaimCell({
  poolAddress,
  executedAt,
  ...props
}: IActionsCellProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes, theme, cx } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const { claim, isLoading } = useClaim(poolAddress);
  const { isClaimable, timeLeft } = useIsClaimable(executedAt);

  return (
    <Table.Cell {...props}>
      {isClaimable ? (
        <Button
          fullWidth
          className={classes.button}
          color="primary"
          disabled={isLoading}
          size="medium"
          variant="outlined"
          onClick={claim}
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            t(keys.claim)
          )}
        </Button>
      ) : (
        <Button
          disabled
          className={cx(classes.button, classes.timeLeftButton)}
          color="secondary"
          size="medium"
        >
          {isMd
            ? t(keys.unlockTime, { time: timeLeft })
            : t(keys.left, { time: timeLeft })}
        </Button>
      )}
    </Table.Cell>
  );
}
