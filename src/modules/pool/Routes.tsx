import { ReactElement } from 'react';
import { generatePath, Route } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { Pool } from 'modules/pool/screens/Pool/Pool';

const PATH = `/pool`;

export const PoolRoutesConfig = createRouteConfig(
  {
    pool: {
      path: PATH,
      generatePath: (poolAddress: string) =>
        generatePath(`${PATH}?poolAddress=${poolAddress}`),
      useParams: (): { poolAddress: string } => {
        const [poolAddress] = useQueryParam('poolAddress', StringParam);

        return { poolAddress: poolAddress || '' };
      },
    },
  },
  PATH,
);

export function getPoolRoutes(): ReactElement {
  return (
    <>
      <Route element={<Pool />} path={PoolRoutesConfig.pool.path} />
    </>
  );
}
