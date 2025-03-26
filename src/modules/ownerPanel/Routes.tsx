import { ReactElement } from 'react';
import { generatePath, Route } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Panel } from './screens/Panel';
import { Pool } from './screens/Pool';

const PATH = `/panel`;
const POOL_PANEL_PATH = `${PATH}/pool`;

export const OwnerPanelRoutesConfig = createRouteConfig(
  {
    panel: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
    pool: {
      path: POOL_PANEL_PATH,
      generatePath: (poolAddress: string) =>
        generatePath(`${POOL_PANEL_PATH}?poolAddress=${poolAddress}`),
      useParams: (): { poolAddress: string } => {
        const [poolAddress] = useQueryParam('poolAddress', StringParam);

        return { poolAddress: poolAddress || '' };
      },
    },
  },
  PATH,
);

export function getOwnerPanelRoutes(): ReactElement {
  return (
    <>
      <Route element={<Panel />} path={OwnerPanelRoutesConfig.panel.path} />

      <Route element={<Pool />} path={OwnerPanelRoutesConfig.pool.path} />
    </>
  );
}
