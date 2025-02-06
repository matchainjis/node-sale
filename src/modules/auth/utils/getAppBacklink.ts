import { WALLET_PARAM } from '../const';

/**
 * Returns the app back link.
 * This is the link that the user will be redirected to after the wallet is connected with deep linking.
 *
 * @param walletId - The wallet ID.
 * @param baseURL - The base URL. Defaults to `window.location.href`.
 */
export function getAppBacklink(
  walletId: string,
  baseURL = window.location.href,
): string {
  const url = new URL(baseURL);
  url.searchParams.set(WALLET_PARAM, walletId);
  return url.toString();
}
