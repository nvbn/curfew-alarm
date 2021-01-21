import { useCallback, useContext, useEffect, useState } from "react";
import { Time } from "../types";
import PersistentStorage from "../contexts/PersistentStorage";
import { isValidNumber, isValidTime } from "../utils";

export type Settings = {
  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

const defaultSettings: Settings = {
  curfewStart: { hour: 20, minute: 30 },
  curfewEnd: { hour: 4, minute: 30 },
  minutesToGoHome: 30,
};

const STORAGE_KEY = "SETTINGS";

const parseSettings = (value: string | null): Settings => {
  let nextSettings = defaultSettings;
  if (value !== null) {
    try {
      nextSettings = { ...nextSettings, ...JSON.parse(value) };
    } catch (e) {
      console.warn("unable to decode settings", e);
    }
  }

  if (!isValidTime(nextSettings.curfewStart)) {
    console.warn("incorrect value in curfewStart", nextSettings.curfewStart);
    nextSettings.curfewStart = defaultSettings.curfewStart;
  }

  if (!isValidTime(nextSettings.curfewEnd)) {
    console.warn("incorrect value in curfewEnd", nextSettings.curfewEnd);
    nextSettings.curfewEnd = defaultSettings.curfewEnd;
  }

  if (!isValidNumber(nextSettings.minutesToGoHome)) {
    console.warn(
      "incorrect value in minutesToGoHome",
      nextSettings.minutesToGoHome,
    );
    nextSettings.minutesToGoHome = defaultSettings.minutesToGoHome;
  }

  return nextSettings;
};

type ReadySettings = [true, Settings, (change: Partial<Settings>) => void];

type InitialisingSettings = [false, null, null];

const useSettings = (
  deps: unknown[] = [],
): ReadySettings | InitialisingSettings => {
  const storage = useContext(PersistentStorage);

  const [[isSettingsStorageReady, settings], setSettings] = useState<
    [true, Settings] | [false, null]
  >([false, null]);
  useEffect(() => {
    storage
      .getItem(STORAGE_KEY)
      .then((value) => setSettings([true, parseSettings(value)]))
      .catch((e) => console.warn("unable to read settings", e));
  }, [setSettings, ...deps]);

  const updateStorageContent = useCallback(
    (changes: Partial<Settings>): void => {
      if (!isSettingsStorageReady) {
        console.warn("to early!");
        return;
      }

      const nextSettings = { ...settings!!, ...changes };

      setSettings([true, nextSettings]);
      storage
        .setItem(STORAGE_KEY, JSON.stringify(nextSettings))
        .catch((e) => console.warn("unable to save settings", e));
    },
    [isSettingsStorageReady, settings, setSettings],
  );

  if (!isSettingsStorageReady) {
    return [false, null, null];
  }

  return [true, settings!!, updateStorageContent];
};

export default useSettings;
