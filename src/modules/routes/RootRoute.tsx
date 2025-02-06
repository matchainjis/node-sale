import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { Layout } from 'modules/layout';

export function RootRoute(): ReactElement {
  useAuth();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
