export async function getIPFSData<T>(id: string): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_IPFS_GATEWAY}/${id}`);

  return res.json();
}
