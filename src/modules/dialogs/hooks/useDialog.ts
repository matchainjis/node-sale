import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { KnownDialogs } from 'modules/dialogs/const/KnownDialogs';

import {
  closeDialog,
  openDialog,
  selectDialogState,
} from '../store/dialogSlice';

export interface IUseDialogData<T = void> {
  isOpened: boolean;
  context: T;
  onClose: () => void;
  onOpen: T extends void ? VoidFunction : (context: T) => void;
}

export function useDialog<TContext = void>(
  modalId: KnownDialogs,
): IUseDialogData<TContext> {
  const dispatch = useDispatch();
  const dialogState = useSelector(selectDialogState);
  const isOpened = dialogState.currentModal === modalId;
  const context = dialogState.context as TContext;

  const handleClose = useCallback(() => dispatch(closeDialog()), [dispatch]);

  const handleOpen = useCallback(
    (context: TContext) => {
      if (isOpened) {
        return;
      }
      dispatch(openDialog({ currentModal: modalId, context }));
    },
    [dispatch, isOpened, modalId],
  );

  return {
    isOpened,
    context,
    onClose: handleClose,
    onOpen: handleOpen as IUseDialogData<TContext>['onOpen'],
  };
}
