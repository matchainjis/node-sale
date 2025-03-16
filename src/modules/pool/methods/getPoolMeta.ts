import { ReadProvider } from 'modules/api';
import { IPFS_PREFIX } from 'modules/api/const';
import { getPoolOwnershipContract } from 'modules/api/methods/getPoolOwnershipContract';
import { getPublicIPFSData } from 'modules/api/methods/getPublicIPFSData';
import { IPoolMeta, IPoolRawMeta } from 'modules/pool/types';
import { getIPFSHash } from 'modules/pool/utils';

function convertRawIpfsToHttpLink(rawLink: string): string {
  return rawLink.startsWith(IPFS_PREFIX)
    ? rawLink.replace(IPFS_PREFIX, `${import.meta.env.VITE_IPFS_GATEWAY}/`)
    : rawLink;
}

export async function getPoolMeta(
  provider: ReadProvider,
  poolAddress: string,
): Promise<IPoolMeta> {
  const ownerShipContract = await getPoolOwnershipContract(provider);

  const metaRawURI = await ownerShipContract.methods
    .tokenURI(poolAddress)
    .call();

  const hash = getIPFSHash(metaRawURI);

  const metaJson = await (async () => {
    /* try {
      const res = await getPinataIPFSData<IPoolRawMeta>(hash);

      return res;
    } catch { */
    return getPublicIPFSData<IPoolRawMeta>(hash);
    // }
  })();

  return {
    address: poolAddress,
    name: metaJson.name,
    description: metaJson.description,
    image: convertRawIpfsToHttpLink(metaJson.image),
    externalLink: metaJson.external_link,
  };
}
