import {
  EEthereumNetworkId,
  RPC_URLS_BY_NETWORK as DEFAULT_RPC_URLS_BY_NETWORK,
} from '@ankr.com/provider';

import { ChainId } from '../chainIDs';
import { ReadProvider } from './ReadProvider';

const RPC_URLS_BY_NETWORK = {
  ...DEFAULT_RPC_URLS_BY_NETWORK,
  [EEthereumNetworkId.holesky]:
    'https://bff.staking.ankr.com/multi-rpc/proxy/eth_holesky',
};

type AvailableChainId = keyof typeof RPC_URLS_BY_NETWORK;

/**
 * Returns RPC URL by chainId. Throws an error if chainId is not found.
 *
 * @param {number} chainId Chain ID
 * @return {string} RPC URL
 */
export function getRpcUrl(chainId: number): string {
  const rpcUrl = RPC_URLS_BY_NETWORK[chainId as AvailableChainId];
  if (!rpcUrl) {
    throw new Error(`RPC URL not found for chainId: ${chainId}`);
  }
  return rpcUrl;
}

const providers: Record<number, ReadProvider> = {};

export async function getReadProvider(chainId: ChainId): Promise<ReadProvider> {
  if (providers[chainId]) {
    return providers[chainId];
  }

  const url = getRpcUrl(chainId);
  const provider = new ReadProvider(url, chainId);
  await provider.connect();

  providers[chainId] = provider;

  return provider;
}
