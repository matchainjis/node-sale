import { pinataSDK } from 'modules/api/pinata';

// NOTE: Getting data from private Pinata account work only if you used same way for uploading
export async function getPinataIPFSData<T>(hash: string): Promise<T> {
  const result = await pinataSDK.gateways.get(hash).then(res => res);

  return result.data as T;
}
