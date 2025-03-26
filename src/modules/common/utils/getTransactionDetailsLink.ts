export function getTransactionDetailsLink(txId: string) {
  // eslint-disable-next-line no-template-curly-in-string
  return `${import.meta.env.VITE_EXPLORER_LINK}tx/${txId}`;
}
