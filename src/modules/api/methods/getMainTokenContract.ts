import { Contract } from 'web3';

import mainTokenAbi from 'modules/api/abi/MainToken';
import { MAIN_TOKEN_ADDRESS } from 'modules/api/const';
import { ReadProvider, WriteProvider } from 'modules/api/web3Provider';

export function getMainTokenContract(
  provider: ReadProvider | WriteProvider,
): Contract<typeof mainTokenAbi> {
  return provider.createContract<typeof mainTokenAbi>(
    mainTokenAbi,
    MAIN_TOKEN_ADDRESS,
  );
}
