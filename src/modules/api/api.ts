import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { cacheTags } from './cacheTags';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
  tagTypes: Object.values(cacheTags) as readonly string[],
});
