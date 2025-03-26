import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Table } from 'modules/common/components/Table';
import { useIntersectionObserver } from 'modules/common/hooks/useIntersectionObserver';
import { PoolRow } from 'modules/dashboard/components/PoolRow/PoolRow';
import { useStyles } from 'modules/dashboard/components/PoolTable/useStyles';
import { useTranslation } from 'modules/i18n';

import { translation } from './translation';

interface IPoolTableProps {
  poolAddresses: string[];
  showDelegated?: boolean;
  onPoolClick?: (poolAdd: string) => void;
}

const ITEMS_PER_LOAD = 5;
export function PoolTable({
  poolAddresses,
  showDelegated = false,
  onPoolClick,
}: IPoolTableProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();

  const [visibleRows, setVisibleRows] = useState<string[]>([]);

  useEffect(() => {
    setVisibleRows(poolAddresses.slice(0, ITEMS_PER_LOAD));
  }, [poolAddresses]);

  const loadMore = useCallback(() => {
    setVisibleRows(prev => {
      if (prev.length >= poolAddresses.length) return prev;
      const addresses = poolAddresses.slice(
        prev.length,
        prev.length + ITEMS_PER_LOAD,
      );
      return [...prev, ...addresses];
    });
  }, [poolAddresses]);

  const setLoaderRef = useIntersectionObserver(loadMore);

  return (
    <div ref={setLoaderRef}>
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
          {visibleRows.map(poolAddress => (
            <PoolRow
              key={poolAddress}
              className={classes.row}
              poolAddress={poolAddress}
              showDelegated={showDelegated}
              onPoolClick={onPoolClick}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
