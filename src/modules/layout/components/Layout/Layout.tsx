import { ReactElement, ReactNode } from 'react';

import { WalletsDialog } from 'modules/auth/components/WalletsDialog';
import { useScrollToTop } from 'modules/common/hooks/useScrollToTop';
import { DelegateDialog } from 'modules/delegate/components/DelegateDialog';
import { KnownDialogs, useDialog } from 'modules/dialogs';
import { WithdrawDialog } from 'modules/withdraw/components/WithdrawDialog';

import { Header } from '../Header';
import { useStyles } from './useStyles';

interface ILayoutProps {
  children: ReactElement | ReactNode;
}

export function Layout({ children }: ILayoutProps): ReactElement {
  useScrollToTop();
  const { classes } = useStyles();

  const { isOpened: isDelegateOpened } = useDialog<string>(
    KnownDialogs.delegate,
  );

  const { isOpened: isWithdrawOpened } = useDialog<string>(
    KnownDialogs.withdraw,
  );

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>

      <Header />

      <WalletsDialog />

      {isDelegateOpened && <DelegateDialog />}

      {isWithdrawOpened && <WithdrawDialog />}
    </div>
  );
}
