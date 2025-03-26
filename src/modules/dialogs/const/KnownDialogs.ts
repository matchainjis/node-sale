export const KnownDialogs = {
  connect: 'connect',
  delegate: 'delegate',
  addSelfstake: 'add-selfstake',
  withdraw: 'withdraw',
  editPool: 'edit-pool',
};

export type KnownDialogs = (typeof KnownDialogs)[keyof typeof KnownDialogs];
