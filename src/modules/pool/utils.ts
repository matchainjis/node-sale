import BigNumber from 'bignumber.js';

import { IPFS_PREFIX } from 'modules/api/const';
import { HUNDRED, ONE } from 'modules/common/const';

interface ICalculateAPYParams {
  totalStakedAmount: BigNumber;
  fee: BigNumber;
}

const avgSecondsInYear = new BigNumber(31556736);
const tokensYear = avgSecondsInYear.div(3).div(2);

export function calculateAPY({
  totalStakedAmount,
  fee,
}: ICalculateAPYParams): BigNumber {
  return tokensYear.multipliedBy(
    ONE.minus(fee.div(HUNDRED)).div(totalStakedAmount).multipliedBy(HUNDRED),
  );
}

export function getIPFSHash(withPrefixLink: string): string {
  return withPrefixLink.startsWith(IPFS_PREFIX)
    ? withPrefixLink.replace(IPFS_PREFIX, '')
    : withPrefixLink;
}
