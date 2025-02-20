import { ReactElement } from 'react';

import { Table } from 'modules/common/components/Table';
import { PoolRow } from 'modules/dashboard/components/PoolRow/PoolRow';
import { useStyles } from 'modules/dashboard/components/PoolTable/useStyles';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';

interface IPoolTableProps {
  poolAddresses: string[];
  showDelegated?: boolean;
}

export function PoolTable({
  poolAddresses,
  showDelegated = false,
}: IPoolTableProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row className={classes.row}>
            <Table.HeadCell>{t(keys.poolName)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.status)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.tvl)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.commission)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.apy)}</Table.HeadCell>

            <Table.HeadCell>
              {showDelegated ? t(keys.myPosition) : ''}
            </Table.HeadCell>

            <Table.HeadCell align="right" className={classes.rightCell}>
              {t(keys.actions)}
            </Table.HeadCell>
          </Table.Row>
        </Table.Head>

        <Table.Body className={classes.body}>
          {poolAddresses.map(poolAddress => (
            <PoolRow
              key={poolAddress}
              className={classes.row}
              poolAddress={poolAddress}
              showDelegated={showDelegated}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
