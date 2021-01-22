/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultSettings, getSettings } from "../settings";

describe("getSettings", () => {
  test("returns default settings if the storage is empty", async () => {
    const storage = {
      getItem: () => new Promise((resolve) => resolve(null)),
    };

    const settings = await getSettings(storage as any);
    expect(settings).toEqual(defaultSettings);
  });

  test("returns default settings if the storage errors", async () => {
    const storage = {
      getItem: () => new Promise((_, reject) => reject()),
    };

    const settings = await getSettings(storage as any);
    expect(settings).toEqual(defaultSettings);
  });

  test("returns stored settings if it exists and valid", async () => {
    const storedSettings = {
      curfewStart: { hour: 22, minute: 15 },
      curfewEnd: { hour: 14, minute: 20 },
      minutesToGoHome: 45,
    };
    const storage = {
      getItem: () =>
        new Promise((resolve) => resolve(JSON.stringify(storedSettings))),
    };

    const settings = await getSettings(storage as any);
    expect(settings).toEqual(storedSettings);
  });

  for (const [key, value] of [
    ["curfewStart", "cat"],
    ["curfewEnd", { hour: NaN, minute: 2 }],
    ["curfewEnd", { hour: 24, minute: -5 }],
    ["curfewEnd", { hour: 100, minute: 10 }],
    ["curfewEnd", { hour: 5, minute: "cat" }],
    ["minutesToGoHome", -12],
    ["minutesToGoHome", NaN],
    ["minutesToGoHome", "dog"],
  ] as any) {
    test(`replaces invalid  ${key} value ${JSON.stringify(
      value,
    )} with default value`, async () => {
      const okSettings = {
        curfewStart: { hour: 22, minute: 15 },
        curfewEnd: { hour: 14, minute: 20 },
        minutesToGoHome: 45,
      };

      const storedSettings = {
        ...okSettings,
        [key]: value,
      };

      const expectedSettings = {
        ...okSettings,
        [key]: (defaultSettings as any)[key],
      };

      const storage = {
        getItem: () =>
          new Promise((resolve) => resolve(JSON.stringify(storedSettings))),
      };

      const settings = await getSettings(storage as any);

      expect(settings).toEqual(expectedSettings);
    });
  }
});
