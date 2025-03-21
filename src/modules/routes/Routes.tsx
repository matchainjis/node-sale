import { ReactElement } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import {
  DashboardRoutesConfig,
  getDashboardRoutes,
} from 'modules/dashboard/Routes';
import { getOwnerPanelRoutes } from 'modules/ownerPanel/Routes';
import { getPoolRoutes } from 'modules/pool/Routes';

import { RootRoute } from './RootRoute';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route element={<RootRoute />} path="/">
        {getDashboardRoutes()}

        {getPoolRoutes()}

        {getOwnerPanelRoutes()}

        <Route
          element={
            <Navigate to={DashboardRoutesConfig.dashboard.generatePath()} />
          }
          path="*"
        />
      </Route>
    </Switch>
  );
}
