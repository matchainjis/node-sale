import { EEthereumNetworkId } from '@ankr.com/provider';

export const ChainId = {
  match: EEthereumNetworkId.match,
  matchTestnet: EEthereumNetworkId.matchTestnet,
} as const;

export type ChainId = (typeof ChainId)[keyof typeof ChainId];

export const chainId = Number(import.meta.env.VITE_CHAIN_ID) as ChainId;
