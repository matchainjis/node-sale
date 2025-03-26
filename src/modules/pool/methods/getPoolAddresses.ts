import { ReadProvider } from 'modules/api';
import { getMainTokenContract } from 'modules/api/methods/getMainTokenContract';
import { memoizePromise } from 'modules/api/methods/memoizePromise';

async function _getPoolAddresses(provider: ReadProvider): Promise<string[]> {
  const MATTokenContract = getMainTokenContract(provider);

  const poolsCount = Number(
    await MATTokenContract.methods.getPoolsCount().call(),
  );

  if (poolsCount > 0) {
    const pools = await Promise.all(
      Array.from({ length: poolsCount }, (_, i) =>
        MATTokenContract.methods._pools(i).call(),
      ),
    );

    return pools.filter(
      pool => typeof pool === 'string',
    ) as unknown[] as string[];
  }

  return [];
}

export const getPoolAddresses = memoizePromise(_getPoolAddresses, provider => {
  return `${provider.chainId}${provider.rpcUrl}`;
});
