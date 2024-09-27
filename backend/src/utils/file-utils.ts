/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseTransactionLine(line: string) {
  const transaction: any = {};
  const pairs = line.split(';');
  pairs.forEach((pair) => {
    const [key, value] = pair.split(':');
    if (key && value) {
      transaction[key.trim()] = value.trim();
    }
  });
  return transaction;
}
