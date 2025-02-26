import { ReadProvider } from 'modules/api';
import { getIPFSData } from 'modules/api/methods/getIPFSData';
import { getPoolOwnershipContract } from 'modules/api/methods/getPoolOwnershipContract';
import { IPoolMeta, IPoolRawMeta } from 'modules/pool/types';

const IPFS_PREFIX = 'ipfs://';

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

  const id = metaRawURI.replace(IPFS_PREFIX, '');
  const metaJson = await getIPFSData<IPoolRawMeta>(id);

  return {
    address: poolAddress,
    name: metaJson.name,
    description: metaJson.description,
    image: convertRawIpfsToHttpLink(metaJson.image),
    externalLink: metaJson.external_link,
  };
}
