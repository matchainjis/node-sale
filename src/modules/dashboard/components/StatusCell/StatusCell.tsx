import { ReactElement } from 'react';

import { Table } from 'modules/common/components/Table';
import { TableCellProps } from 'modules/common/components/Table/TableCell';
import { Status } from 'modules/pool/components/Status';
import { PoolStatus } from 'modules/pool/types';

interface IStatusCellProps extends TableCellProps {
  status: PoolStatus;
}

export function StatusCell({
  status,
  ...props
}: IStatusCellProps): ReactElement {
  return (
    <Table.Cell {...props}>
      <Status status={status} />
    </Table.Cell>
  );
}
