import BigNumber from 'bignumber.js';

import { HUNDRED, ONE } from 'modules/common/const';

interface ICalculateAPYParams {
  totalStakedAmount: BigNumber;
  fee: BigNumber;
}

const avgSecondsInYear = new BigNumber(31556736);
const tokensYear = avgSecondsInYear.div(3);

export function calculateAPY({
  totalStakedAmount,
  fee,
}: ICalculateAPYParams): BigNumber {
  return tokensYear.multipliedBy(
    ONE.minus(fee.div(HUNDRED)).div(totalStakedAmount),
  );
}
