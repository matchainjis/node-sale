import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import packageJson from './package.json';

export default defineConfig(() => ({
  base: packageJson.homepage,
  define: {
    'import.meta.env.VITE_NAME': JSON.stringify(packageJson.name),
    'import.meta.env.VITE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    !process.env.DISABLE_ESLINT && eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    svgr(),
    tsconfigPaths(),
    react(),
    ViteEjsPlugin(viteConfig => ({
      // viteConfig is the current Vite resolved config
      env: viteConfig.env,
    })),
  ],
  build: {
    outDir: packageJson.buildFolderName,
    sourcemap: true,
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@binance-chain/bsc-connector': resolve(
        __dirname,
        './node_modules/@binance-chain/bsc-connector/dist/bsc-connector.esm.js',
      ),
    },
  },
}));
