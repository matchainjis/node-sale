import { useEffect, useState } from 'react';

import { ONE_MINUTE_MS } from 'modules/common/const';
import { getClaimTimeLeft } from 'modules/pool/utils/getClaimTimeLeft';

interface IUseIsClaimableResult {
  isClaimable: boolean;
  timeLeft: string | null;
}

export function useIsClaimable(executedAt: Date): IUseIsClaimableResult {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isClaimable, setIsClaimable] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const timeLeft = getClaimTimeLeft(executedAt);

      if (timeLeft === null) {
        setTimeLeft(null);
        setIsClaimable(true);
      } else {
        setTimeLeft(timeLeft);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, ONE_MINUTE_MS);

    return () => clearInterval(interval);
  }, [executedAt]);

  return { isClaimable, timeLeft };
}
