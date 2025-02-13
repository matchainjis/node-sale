/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_VERSION: string;
  readonly VITE_NAME: string;

  readonly VITE_CHAIN_ID: string;
  readonly VITE_EXPLORER_LINK: string;
  readonly VITE_MAIN_TOKEN_ADDRESS: string;
  readonly VITE_IPFS_GATEWAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
