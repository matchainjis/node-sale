declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: unknown;
    web3: Web3;
    ethereum: {
      isCoin98: boolean;
    };
    trustwallet: boolean;
    safari?: unknown;
    ApplePaySetupFeature?: unknown;
    MetaCRMTracking: {
      manualConnectWallet: (account: string) => void;
      init: ({ apiKey: string }) => void;
    };
    MetaCRMWidget: {
      manualConnectWallet: (account: string) => void;
    };
  }
}

export {};
