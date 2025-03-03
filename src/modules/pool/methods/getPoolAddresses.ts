import { ReadProvider } from 'modules/api';
import { MAIN_TOKEN_ADDRESS } from 'modules/api/const';
import { getMainTokenContract } from 'modules/api/methods/getMainTokenContract';
import { memoizePromise } from 'modules/api/methods/memoizePromise';

async function _getPoolAddresses(provider: ReadProvider): Promise<string[]> {
  console.log('1');
  const MATTokenContract = getMainTokenContract(provider);

  const web3 = provider.getWeb3();

  const latestBlock = await web3.eth.getBlock('latest');
  const getCode = await web3.eth.getCode(MAIN_TOKEN_ADDRESS);

  console.log('latestBlock', latestBlock);
  console.log('getCode', getCode);

  console.log('2', MATTokenContract.methods.getPoolsCount());

  const poolsCount = Number(
    await MATTokenContract.methods.getPoolsCount().call(),
  );
  console.log('3', poolsCount);
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
