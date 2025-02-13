import { getUniqueId } from '@ankr.com/utils/getUniqueId';

export const cacheTags = {
  account: `account-${getUniqueId()}`,
  chainData: `chainData-${getUniqueId()}`,
  pools: `pool-${getUniqueId()}`,
};
