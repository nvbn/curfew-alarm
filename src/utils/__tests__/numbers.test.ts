import { isValidNumber } from "../numbers";

describe("isValidNumber", () => {
  test("valid is valid", () => {
    const result = isValidNumber(23);

    expect(result).toBe(true);
  });

  test("non-number type is invalid", () => {
    const result = isValidNumber("23");

    expect(result).toBe(false);
  });

  test("NaN is invalid", () => {
    const result = isValidNumber(NaN);

    expect(result).toBe(false);
  });
});
