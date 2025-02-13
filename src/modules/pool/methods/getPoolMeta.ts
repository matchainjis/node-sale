import { ReadProvider } from 'modules/api';
import { getPoolOwnershipContract } from 'modules/api/methods/getPoolOwnershipContract';
import { IPoolMeta, IPoolRawMeta } from 'modules/pool/types';

function convertRawIpfsToHttpLink(rawLink: string): string {
  return rawLink.startsWith('ipfs://')
    ? rawLink.replace('ipfs://', import.meta.env.VITE_IPFS_GATEWAY)
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

  const metaURI = convertRawIpfsToHttpLink(metaRawURI);
  const metaResponse = await fetch(metaURI);

  const metaJson = (await metaResponse.json()) as IPoolRawMeta;

  return {
    name: metaJson.name,
    description: metaJson.description,
    image: convertRawIpfsToHttpLink(metaJson.image),
    externalLink: metaJson.external_link,
  };
}
