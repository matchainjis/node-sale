import { ReactElement } from 'react';

import { mapDataToUndefinedIfSkip } from 'modules/api/utils';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { Table } from 'modules/common/components/Table';
import { useTranslation } from 'modules/i18n';
import {
  EMPTY_POOL_UNSTAKES,
  useGetPendingUnstakesQuery,
} from 'modules/pool/actions/getPendingUnstakes';

import { ClaimRow } from '../ClaimRow';
import { translation } from './translation';
import { useStyles } from './useStyles';

interface IClaimTableProps {
  poolAddresses: string[];
}

export function ClaimTable({ poolAddresses }: IClaimTableProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();

  const { isConnected } = useConnection();
  const { data: pendingUnstakes = EMPTY_POOL_UNSTAKES } =
    useGetPendingUnstakesQuery(
      { poolAddresses },
      { skip: !isConnected, selectFromResult: mapDataToUndefinedIfSkip },
    );

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row className={classes.row}>
            <Table.HeadCell>{t(keys.poolName)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.withdrawalAmount)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.initiated)}</Table.HeadCell>

            <Table.HeadCell className={classes.rightCell}>
              {t(keys.unlockTime)}
            </Table.HeadCell>
          </Table.Row>
        </Table.Head>

        <Table.Body className={classes.body}>
          {pendingUnstakes.map(unstake => (
            <ClaimRow
              key={unstake.executedAt.getTime()}
              className={classes.row}
              poolUnstake={unstake}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
