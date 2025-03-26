import BigNumber from 'bignumber.js';
import { utils } from 'web3';
import type { Numbers } from 'web3-types';

export function convertFromWei(
  value: Numbers,
  unit: 'ether' | number = 'ether',
) {
  return new BigNumber(utils.fromWei(value, unit));
}

export function convertToWei(
  value: BigNumber,
  unit: 'ether' | number = 'ether',
) {
  return utils.toWei(value.toString(), unit);
}

export const mapDataToUndefinedIfSkip = <
  T extends { data?: unknown; isUninitialized?: boolean },
>(
  result: T,
): T => (result.isUninitialized ? { ...result, data: undefined } : result);
