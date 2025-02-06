import { ReactElement } from 'react';
import { generatePath, Route } from 'react-router-dom';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { Dashboard } from 'modules/dashboard/screens/Dashboard';

const PATH = '/dashboard';

export const DashboardRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getDashboardRoutes(): ReactElement {
  return (
    <Route
      element={<Dashboard />}
      path={DashboardRoutesConfig.dashboard.path}
    />
  );
}
