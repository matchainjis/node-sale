/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_VERSION: string;
  readonly VITE_NAME: string;

  readonly VITE_CHAIN_ID: string;
  readonly VITE_EXPLORER_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
