import { isValidNumber } from "../numbers";

describe("isValidNumber", () => {
  for (const [number, expectedIsValid] of [
    [23, true],
    [0, true],
    ["23", false],
    [NaN, false],
    [null, false],
  ]) {
    test(`${number} => ${expectedIsValid}`, () => {
      const isValid = isValidNumber(number);

      expect(isValid).toBe(expectedIsValid);
    });
  }
});
