import BigNumber from 'bignumber.js';
import { utils } from 'web3';

import { getReadProvider, getWriteProvider } from 'modules/api';
import { chainId } from 'modules/api/chainIDs';
import { IPFS_PREFIX } from 'modules/api/const';
import { getPoolOwnershipContract } from 'modules/api/methods/getPoolOwnershipContract';
import { getStakingPoolContract } from 'modules/api/methods/getStakingPoolContract';
import { pinataSDK } from 'modules/api/pinata';
import { convertToWei } from 'modules/api/utils';
import { IEditPoolArgs } from 'modules/ownerPanel/types';
import { getPool } from 'modules/pool/methods/getPool';
import { getPoolMeta } from 'modules/pool/methods/getPoolMeta';
import { IPoolRawMeta } from 'modules/pool/types';

export async function editPool({
  poolAddress,
  name,
  description,
  image,
  comission,
}: IEditPoolArgs): Promise<boolean> {
  const readProvider = await getReadProvider(chainId);
  const writeProvider = await getWriteProvider();

  const pool = await getPool(readProvider, poolAddress);
  const poolMeta = await getPoolMeta(readProvider, poolAddress);

  const isMetaEqual =
    poolMeta.name === name && poolMeta.description === description && !image;

  const isComissionEqual = !!pool?.commission.isEqualTo(
    new BigNumber(comission),
  );

  if (!isMetaEqual) {
    const ipfsImageLink = await (async () => {
      if (!image) {
        return poolMeta.image;
      }

      const response = await pinataSDK.upload.file(image);

      return `${IPFS_PREFIX}${response.IpfsHash}`;
    })();

    const rawMetadata: IPoolRawMeta = {
      name,
      description,
      image: ipfsImageLink,
      external_link: poolMeta.externalLink,
    };

    const response = await pinataSDK.upload.json(rawMetadata);
    const ipfsDataLink = `${IPFS_PREFIX}${response.IpfsHash}`;

    const poolOwnershipContract = await getPoolOwnershipContract(writeProvider);
    const poolContract = getStakingPoolContract(writeProvider, poolAddress);

    const nftToken = await poolContract.methods.ownershipNFT().call();

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const data = poolOwnershipContract.methods
      .setTokenURI(utils.hexToNumberString(poolAddress), ipfsDataLink)
      .encodeABI();

    const result = await writeProvider.sendTransactionAsync(
      writeProvider.currentAccount,
      nftToken,
      {
        data,
        estimate: true,
        estimateFee: true,
      },
    );

    void (await result.receiptPromise);
  }

  if (!isComissionEqual) {
    const poolContract = getStakingPoolContract(writeProvider, poolAddress);

    const data = poolContract.methods
      .setFee(convertToWei(new BigNumber(comission), 2))
      .encodeABI();

    const result = await writeProvider.sendTransactionAsync(
      writeProvider.currentAccount,
      poolAddress,
      {
        data,
        estimate: true,
        estimateFee: true,
      },
    );

    void (await result.receiptPromise);
  }

  return true;
}
