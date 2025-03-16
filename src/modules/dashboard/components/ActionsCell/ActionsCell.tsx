import { ReactElement } from 'react';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { Table } from 'modules/common/components/Table';
import { TableCellProps } from 'modules/common/components/Table/TableCell';
import MinusIcon from 'modules/common/icons/minus-icon.svg?react';
import PlusIcon from 'modules/common/icons/plus-icon.svg?react';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';
import { useStyles } from './useStyles';

interface IActionsCellProps extends TableCellProps {
  poolAddress: string;
  isDelegateOnly?: boolean;
}

export function ActionsCell({
  poolAddress,
  isDelegateOnly = true,
  ...props
}: IActionsCellProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes, theme } = useStyles();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const { onOpen: onDelegateOpen } = useDialog<string>(KnownDialogs.delegate);

  const { onOpen: onWithdrawOpen } = useDialog<string>(KnownDialogs.withdraw);

  return (
    <Table.Cell {...props}>
      <div className={classes.root}>
        {isDelegateOnly ? (
          <Button
            fullWidth
            className={classes.button}
            color="primary"
            size="medium"
            variant="outlined"
            onClick={event => {
              event.stopPropagation();
              onDelegateOpen(poolAddress);
            }}
          >
            {t(keys.delegate)}
          </Button>
        ) : (
          <>
            <Tooltip
              open={isMd ? false : undefined}
              placement="top"
              title={t(keys.withdraw)}
            >
              <Button
                className={classes.squareButton}
                color="secondary"
                variant="outlined"
                onClick={event => {
                  event.stopPropagation();
                  onWithdrawOpen(poolAddress);
                }}
              >
                {isMd ? t(keys.withdraw) : <MinusIcon />}
              </Button>
            </Tooltip>

            <Tooltip
              open={isMd ? false : undefined}
              placement="top"
              title={t(keys.delegateMore)}
            >
              <Button
                className={classes.squareButton}
                color="primary"
                variant="outlined"
                onClick={event => {
                  event.stopPropagation();
                  onDelegateOpen(poolAddress);
                }}
              >
                {isMd ? t(keys.delegateMore) : <PlusIcon />}
              </Button>
            </Tooltip>
          </>
        )}
      </div>
    </Table.Cell>
  );
}
