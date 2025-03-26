import {
  addMilliseconds,
  differenceInSeconds,
  formatDistanceToNow,
} from 'date-fns';

import { UNSTAKE_PERIOD_DAYS } from 'modules/api/const';

const UNSTAKE_PERIOD_MS = UNSTAKE_PERIOD_DAYS * 24 * 60 * 60 * 1000;

export function getClaimTimeLeft(executedAt: Date): string | null {
  const unlockTime = addMilliseconds(executedAt, UNSTAKE_PERIOD_MS);

  const now = new Date();
  const secondsLeft = differenceInSeconds(unlockTime, now);

  return secondsLeft > 0
    ? formatDistanceToNow(unlockTime, { addSuffix: false })
    : null;
}
