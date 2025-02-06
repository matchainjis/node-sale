import { ReactElement, ReactNode } from 'react';

import { useScrollToTop } from 'modules/common/hooks/useScrollToTop';

interface ILayoutProps {
  children: ReactElement | ReactNode;
}

export function Layout({ children }: ILayoutProps): ReactElement {
  useScrollToTop();

  return <div>{children}</div>;
}
