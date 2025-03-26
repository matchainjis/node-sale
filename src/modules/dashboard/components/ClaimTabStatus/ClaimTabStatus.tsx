import { ReactElement, useEffect, useState } from 'react';
import { Chip } from '@mui/material';

import { ONE_MINUTE_MS } from 'modules/common/const';
import { globalTranslation, useTranslation } from 'modules/i18n';
import { IPoolUnstake } from 'modules/pool/types';
import { getClaimTimeLeft } from 'modules/pool/utils/getClaimTimeLeft';

interface IClaimTabStatusProps {
  poolUnstakes: IPoolUnstake[];
}

const CHIP_MIN_WIDTH = 24;

export function ClaimTabStatus({
  poolUnstakes,
}: IClaimTabStatusProps): ReactElement | null {
  const { t, keys } = useTranslation(globalTranslation);
  const [claimableUnstakes, setClaimableUnstakes] = useState(0);
  const totalUnstakes = poolUnstakes.length;

  useEffect(() => {
    const updateTimer = () => {
      setClaimableUnstakes(
        poolUnstakes?.filter(({ executedAt }) => !getClaimTimeLeft(executedAt))
          .length ?? 0,
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, ONE_MINUTE_MS);

    return () => clearInterval(interval);
  }, [poolUnstakes]);

  if (claimableUnstakes === 0 && totalUnstakes === 0) {
    return null;
  }

  if (claimableUnstakes === 0 && totalUnstakes !== 0) {
    return (
      <Chip
        color="warning"
        label={totalUnstakes}
        size="small"
        sx={{ minWidth: CHIP_MIN_WIDTH }}
      />
    );
  }

  if (claimableUnstakes > 0 && claimableUnstakes <= totalUnstakes) {
    return (
      <Chip
        color="success"
        label={
          claimableUnstakes === totalUnstakes
            ? totalUnstakes
            : `${claimableUnstakes} ${t(keys.common.of)} ${totalUnstakes}`
        }
        size="small"
        sx={{ minWidth: CHIP_MIN_WIDTH }}
      />
    );
  }

  return null;
}
