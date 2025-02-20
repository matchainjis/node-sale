/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IClaimLoadingState {
  loading: Record<string, boolean>;
}

export interface IClaimLoadingPayload {
  poolAddress: string;
  loading: boolean;
}

interface IRootState {
  claim: IClaimLoadingState;
}

const initialState: IClaimLoadingState = {
  loading: {},
};

export const claimSlice = createSlice({
  name: 'claim',
  initialState,
  reducers: {
    setClaimLoading: (state, action: PayloadAction<IClaimLoadingPayload>) => {
      const { poolAddress, loading } = action.payload;

      state.loading = {
        ...state.loading,
        [poolAddress]: loading,
      };
    },
  },
});

export const selectClaimLoadingState = (state: IRootState) =>
  state.claim.loading;

export const { setClaimLoading } = claimSlice.actions;
