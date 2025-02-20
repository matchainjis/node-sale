export const KnownDialogs = {
  connect: 'connect',
  delegate: 'delegate',
  withdraw: 'withdraw',
};

export type KnownDialogs = (typeof KnownDialogs)[keyof typeof KnownDialogs];
