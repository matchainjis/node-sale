import { providerDefaultOptions } from '@ankr.com/provider';

import { WriteProvider } from './WriteProvider';

export async function getWriteProvider(
  walletId?: string,
): Promise<WriteProvider> {
  const provider = WriteProvider.getInstance();

  if (!provider.isConnected()) {
    await provider.inject(walletId, providerDefaultOptions);
    await provider.connect();
  }

  return provider;
}
