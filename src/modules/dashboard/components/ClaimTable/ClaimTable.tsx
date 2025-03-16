import { ReactElement } from 'react';

import { Table } from 'modules/common/components/Table';
import { useTranslation } from 'modules/i18n';
import { IPoolUnstake } from 'modules/pool/types';

import { ClaimRow } from '../ClaimRow';
import { translation } from './translation';
import { useStyles } from './useStyles';

interface IClaimTableProps {
  className?: string;
  isHidePoolName?: boolean;
  pendingUnstakes: IPoolUnstake[];
}

export function ClaimTable({
  className,
  pendingUnstakes,
  isHidePoolName,
}: IClaimTableProps): ReactElement {
  const { t, keys } = useTranslation(translation);
  const { classes, cx } = useStyles();

  const rowClassName = cx(classes.row, isHidePoolName && classes.hidePoolName);

  return (
    <div className={className}>
      <Table>
        <Table.Head>
          <Table.Row className={rowClassName}>
            {!isHidePoolName && (
              <Table.HeadCell>{t(keys.poolName)}</Table.HeadCell>
            )}

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
              className={rowClassName}
              isHidePoolName={isHidePoolName}
              poolUnstake={unstake}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
