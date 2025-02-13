import { ReactElement, ReactNode } from 'react';

import { WalletsDialog } from 'modules/auth/components/WalletsDialog';
import { useScrollToTop } from 'modules/common/hooks/useScrollToTop';

import { Header } from '../Header';
import { useStyles } from './useStyles';

interface ILayoutProps {
  children: ReactElement | ReactNode;
}

export function Layout({ children }: ILayoutProps): ReactElement {
  useScrollToTop();
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>

      <Header />

      <WalletsDialog />
    </div>
  );
}
