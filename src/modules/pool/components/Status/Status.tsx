import { ReactElement, useMemo } from 'react';
import { Chip, ChipProps, Tooltip } from '@mui/material';

import { useTranslation } from 'modules/i18n';
import { PoolStatus } from 'modules/pool/types';

import { translation } from './translation';

interface IStatusCellProps extends ChipProps {
  status: PoolStatus;
}

interface ChipData {
  label: string;
  color: 'success' | 'error' | 'warning';
  tooltip?: string;
}

export function Status({ status, ...props }: IStatusCellProps): ReactElement {
  const { t, keys } = useTranslation(translation);

  const { label, color, tooltip }: ChipData = useMemo(() => {
    switch (status) {
      case PoolStatus.Active:
        return {
          label: t(keys.active),
          color: 'success',
        };
      case PoolStatus.Unqualified:
      default:
        return {
          label: t(keys.unqualified),
          color: 'warning',
          tooltip: t(keys.unqualifiedTooltip),
        };
    }
  }, [keys.active, keys.unqualified, keys.unqualifiedTooltip, status, t]);

  return (
    <Tooltip open={tooltip ? undefined : false} title={tooltip}>
      <Chip {...props} color={color} label={label} size="small" />
    </Tooltip>
  );
}
