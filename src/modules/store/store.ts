import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from 'modules/api';
import { listenerMiddleware } from 'modules/auth';
import { dialogSlice } from 'modules/dialogs';
import { claimSlice } from 'modules/pool/claimSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [dialogSlice.name]: dialogSlice.reducer,
  [claimSlice.name]: claimSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // TODO: fix serializable error
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: false,
    })
      .concat(listenerMiddleware.middleware)
      .concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
