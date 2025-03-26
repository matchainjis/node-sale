import { EWalletId } from '@ankr.com/provider';

export const EvmWalletId = EWalletId;

export type EvmWalletId = (typeof EvmWalletId)[keyof typeof EvmWalletId];
