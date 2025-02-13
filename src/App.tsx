import React, { JSX } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BigNumber from 'bignumber.js';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { useIsInitializedLocale } from 'modules/i18n';
import { CustomizedSnackbarProvider } from 'modules/notifications';
import { Routes } from 'modules/routes/Routes';
import { store } from 'modules/store';
import { mainTheme } from 'modules/themes/mainTheme';

import packageJson from '../package.json';

BigNumber.config({
  EXPONENTIAL_AT: [-100, 100],
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: 1,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ' ',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
  },
});

function App(): JSX.Element {
  const isInitialized = useIsInitializedLocale();

  const muiCache = createCache({
    key: 'mui',
  });

  return (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={mainTheme}>
          <BrowserRouter basename={packageJson.homepage}>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <CssBaseline />

              <CustomizedSnackbarProvider />

              {isInitialized && <Routes />}
            </QueryParamProvider>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default App;
