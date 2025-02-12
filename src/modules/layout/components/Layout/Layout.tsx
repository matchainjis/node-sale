import { ReactElement, ReactNode } from 'react';

import { WalletsDialog } from 'modules/auth/components/WalletsDialog';
import { useScrollToTop } from 'modules/common/hooks/useScrollToTop';
import { Header } from 'modules/layout/components/Header/Header';

interface ILayoutProps {
  children: ReactElement | ReactNode;
}

export function Layout({ children }: ILayoutProps): ReactElement {
  useScrollToTop();

  return (
    <div>
      <Header />

      {children}

      <WalletsDialog />
    </div>
  );
}
