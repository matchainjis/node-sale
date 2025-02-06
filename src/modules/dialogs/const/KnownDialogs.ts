export const KnownDialogs = {
  connect: 'connect',
};

export type KnownDialogs = (typeof KnownDialogs)[keyof typeof KnownDialogs];
