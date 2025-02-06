import { EthereumWeb3KeyProvider } from '@ankr.com/provider';

export class WriteProvider extends EthereumWeb3KeyProvider {
  private static instance: WriteProvider;

  static getInstance(): WriteProvider {
    if (!WriteProvider.instance) {
      WriteProvider.instance = new WriteProvider();
    }

    return WriteProvider.instance;
  }
}
