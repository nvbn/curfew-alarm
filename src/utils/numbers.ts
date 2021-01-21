export const isValidNumber = (value: unknown): value is number =>
  Number.isInteger(value) && !isNaN(value as number);
