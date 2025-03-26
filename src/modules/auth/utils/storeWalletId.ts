import { EvmWalletId } from 'modules/api';

const WALLET_ID_STORAGE_KEY = '___wallet_id';

/**
 * Save wallet id to local storage.
 *
 * @param walletId - wallet id.
 * @returns void.
 */
export function storeWalletId(walletId: EvmWalletId): void {
  localStorage.setItem(WALLET_ID_STORAGE_KEY, walletId);
}

/**
 * Restore wallet id from local storage.
 *
 * @returns wallet id.
 */
export function restoreWalletId(): EvmWalletId | undefined {
  return localStorage.getItem(WALLET_ID_STORAGE_KEY) as EvmWalletId | undefined;
}

/**
 * Remove wallet id from local storage.
 *
 * @returns void.
 */
export function removeStoredWalletId(): void {
  localStorage.removeItem(WALLET_ID_STORAGE_KEY);
}
