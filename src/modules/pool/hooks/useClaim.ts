import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'modules/store';

import { useClaimMutation } from '../actions/claim';
import { selectClaimLoadingState, setClaimLoading } from '../claimSlice';

interface IUseClaimResult {
  isLoading: boolean;
  claim: () => void;
}

export function useClaim(poolAddress: string): IUseClaimResult {
  const [claim, { isLoading: isClaimLoading }] = useClaimMutation();
  const dispatch = useDispatch();
  const isClaimLoadingState = useSelector(state =>
    selectClaimLoadingState(state as RootState),
  );

  const isLoading = isClaimLoading || !!isClaimLoadingState?.[poolAddress];

  const handleClaim = useCallback(() => {
    if (isLoading) {
      return;
    }

    dispatch(setClaimLoading({ poolAddress, loading: true }));

    claim({ poolAddress }).finally(() =>
      dispatch(setClaimLoading({ poolAddress, loading: false })),
    );
  }, [claim, dispatch, isLoading, poolAddress]);

  return {
    isLoading,
    claim: handleClaim,
  };
}
