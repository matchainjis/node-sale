import { Milliseconds } from '@ankr.com/utils/unit';
import BigNumber from 'bignumber.js';

export const ZERO = new BigNumber(0);

export const ONE = new BigNumber(1);

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const ETH_GAS_LIMIT_MULTIPLIER = 1.5;

export const PROJECT_POLLING_INTERVAL: Milliseconds = 180000; // 3 minutes
