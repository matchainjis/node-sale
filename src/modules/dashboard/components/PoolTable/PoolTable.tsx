import { ReactElement } from 'react';

import { Table } from 'modules/common/components/Table';
import { PoolRow } from 'modules/dashboard/components/PoolRow/PoolRow';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';

interface IDelegateTableProps {
  poolAddresses: string[];
  showDelegated?: boolean;
}

export function PoolTable({
  poolAddresses,
  showDelegated = false,
}: IDelegateTableProps): ReactElement {
  const { t, keys } = useTranslation(translation);

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>{t(keys.poolName)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.status)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.tvl)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.commission)}</Table.HeadCell>

            <Table.HeadCell>{t(keys.apy)}</Table.HeadCell>

            <Table.HeadCell>
              {showDelegated ? t(keys.myPosition) : ''}
            </Table.HeadCell>

            <Table.HeadCell align="right">{t(keys.actions)}</Table.HeadCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {poolAddresses.map(poolAddress => (
            <PoolRow
              key={poolAddress}
              poolAddress={poolAddress}
              showDelegated={showDelegated}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
