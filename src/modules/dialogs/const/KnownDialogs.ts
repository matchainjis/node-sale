export const KnownDialogs = {
  connect: 'connect',
  delegate: 'delegate',
};

export type KnownDialogs = (typeof KnownDialogs)[keyof typeof KnownDialogs];
