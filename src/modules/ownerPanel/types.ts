import BigNumber from 'bignumber.js';

export interface IEditPoolArgs {
  name: string;
  description: string;
  image: File | null;
  comission: BigNumber;
  poolAddress: string;
}
