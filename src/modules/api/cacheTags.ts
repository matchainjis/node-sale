import { getUniqueId } from '@ankr.com/utils/getUniqueId';

export const cacheTags = {
  account: `account-${getUniqueId()}`,
  chainData: `chain-data-${getUniqueId()}`,
  pools: `pool-${getUniqueId()}`,
  poolsMeta: `pool-meta-${getUniqueId()}`,
  allowance: `allowance-${getUniqueId()}`,
  unstake: `unstake-${getUniqueId()}`,
  claim: `claim-${getUniqueId()}`,
};
