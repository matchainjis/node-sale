import { Milliseconds } from '@ankr.com/utils/unit';
import BigNumber from 'bignumber.js';

export const ZERO = new BigNumber(0);

export const ONE = new BigNumber(1);

export const HUNDRED = new BigNumber(100);

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const ETH_GAS_LIMIT_MULTIPLIER = 1.5;

export const PROJECT_POLLING_INTERVAL: Milliseconds = 180000; // 3 minutes

export const DEFAULT_DECIMAL_PLACES = 4;

export const DEFAULT_LONG_DECIMAL_PLACES = 8;

export const BUY_MORE_LINK = 'https://ankr.com/buy';
