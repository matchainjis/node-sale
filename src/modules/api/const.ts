export const MAIN_TOKEN_ADDRESS = import.meta.env.VITE_MAIN_TOKEN_ADDRESS;

export const UNSTAKE_PERIOD_DAYS =
  import.meta.env.VITE_ENV === 'prod' ? 7 : 0.00347;
