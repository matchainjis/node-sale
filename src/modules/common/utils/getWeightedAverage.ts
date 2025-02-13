import BigNumber from 'bignumber.js';

import { ZERO } from '../const';

export function getWeightedAverage(
  params: [BigNumber, BigNumber][],
): BigNumber {
  const sum = params.reduce(
    (acc, [value, weight]) => acc.plus(value.multipliedBy(weight)),
    ZERO,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const weightSum = params.reduce((acc, [_, weight]) => acc.plus(weight), ZERO);

  return weightSum.isZero() ? ZERO : sum.div(weightSum);
}
