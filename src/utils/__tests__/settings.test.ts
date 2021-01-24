/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  makePersistentStorageWithDataAndBehavior,
  PERSISTENT_STORAGE_BEHAVIOR_ERROR,
} from "../../fakes/PersistentStorage";
import {
  DEFAULT_SETTINGS,
  getSettings,
  STORAGE_KEY,
  updateSettings,
} from "../settings";

describe("getSettings", () => {
  test("returns default settings if the storage is empty", async () => {
    const storage = makePersistentStorageWithDataAndBehavior();

    const settings = await getSettings(storage);
    expect(settings).toEqual(DEFAULT_SETTINGS);
  });

  test("returns default settings if the storage errors", async () => {
    const storage = makePersistentStorageWithDataAndBehavior({
      getItem: PERSISTENT_STORAGE_BEHAVIOR_ERROR,
    });

    const settings = await getSettings(storage);
    expect(settings).toEqual(DEFAULT_SETTINGS);
  });

  test("returns stored settings if it exists and valid", async () => {
    const storedSettings = {
      curfewStart: { hour: 22, minute: 15 },
      curfewEnd: { hour: 14, minute: 20 },
      minutesToGoHome: 45,
      enabled: false,
    };
    const storage = makePersistentStorageWithDataAndBehavior({
      data: { [STORAGE_KEY]: JSON.stringify(storedSettings) },
    });

    const settings = await getSettings(storage);
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
    ["enabled", "sure"],
    ["enabled", NaN],
  ] as any) {
    test(`replaces invalid  ${key} value ${JSON.stringify(
      value,
    )} with default value`, async () => {
      const okSettings = {
        curfewStart: { hour: 22, minute: 15 },
        curfewEnd: { hour: 14, minute: 20 },
        minutesToGoHome: 45,
        enabled: false,
      };

      const storedSettings = {
        ...okSettings,
        [key]: value,
      };

      const expectedSettings = {
        ...okSettings,
        [key]: (DEFAULT_SETTINGS as any)[key],
      };

      const storage = makePersistentStorageWithDataAndBehavior({
        data: {
          [STORAGE_KEY]: JSON.stringify(storedSettings),
        },
      });

      const settings = await getSettings(storage);
      expect(settings).toEqual(expectedSettings);
    });
  }
});

describe("updateSettings", async () => {
  test("stores new settings if everything is ok", async () => {
    const settingsToStore = {
      curfewStart: { hour: 22, minute: 30 },
      curfewEnd: { hour: 3, minute: 15 },
      minutesToGoHome: 15,
      enabled: true,
    };

    const storage = makePersistentStorageWithDataAndBehavior();
    await updateSettings(storage, settingsToStore);

    const storedSettings = await storage.getItem(STORAGE_KEY);
    expect(JSON.parse(storedSettings ?? "")).toEqual(settingsToStore);
  });

  test("propagates error on error", async () => {
    const settingsToStore = {
      curfewStart: { hour: 22, minute: 30 },
      curfewEnd: { hour: 3, minute: 15 },
      minutesToGoHome: 15,
      enabled: false,
    };

    const storage = makePersistentStorageWithDataAndBehavior({
      setItem: PERSISTENT_STORAGE_BEHAVIOR_ERROR,
    });

    try {
      await updateSettings(storage, settingsToStore);
      expect(false).toBe(true); // shouldn't reach this line
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
