import BigNumber from 'bignumber.js';

export enum PoolStatus {
  Active = 'ACTIVE',
  Unqualified = 'UNQUALIFIED',
}

export interface IPool extends IPoolMeta {
  address: string;
  status: PoolStatus;
  commission: BigNumber;
  tvl: BigNumber;
  totalDelegators: BigNumber;
}

export interface IPoolMeta {
  name: string;
  description: string;
  image: string; // format - https://ipfs.io/ipfs/image
  externalLink: string;
}

export interface IPoolRawMeta {
  description: string;
  // eslint-disable-next-line camelcase
  external_link: string;
  image: string; // format - ipfs://image
  name: string;
}

export interface IAccountPool {
  address: string;
  stakedAmount: BigNumber;
}
