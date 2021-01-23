import IPersistentStorage from "../dependencies/IPersistentStorage";
import { isValidNumber } from "./numbers";
import { isValidTime, Time } from "./time";

export type Settings = {
  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

export const defaultSettings: Settings = {
  curfewStart: { hour: 21, minute: 0 },
  curfewEnd: { hour: 4, minute: 30 },
  minutesToGoHome: 30,
};

const STORAGE_KEY = "SETTINGS";

const parseSettings = (serialised: string | null): Settings => {
  let settings = defaultSettings;
  if (serialised !== null) {
    try {
      settings = { ...settings, ...JSON.parse(serialised) };
    } catch (e) {
      console.warn("unable to decode settings", e);
    }
  }

  if (!isValidTime(settings.curfewStart)) {
    console.warn("incorrect value in curfewStart", settings.curfewStart);
    settings.curfewStart = defaultSettings.curfewStart;
  }

  if (!isValidTime(settings.curfewEnd)) {
    console.warn("incorrect value in curfewEnd", settings.curfewEnd);
    settings.curfewEnd = defaultSettings.curfewEnd;
  }

  if (
    !isValidNumber(settings.minutesToGoHome) ||
    settings.minutesToGoHome < 0
  ) {
    console.warn(
      "incorrect value in minutesToGoHome",
      settings.minutesToGoHome,
    );
    settings.minutesToGoHome = defaultSettings.minutesToGoHome;
  }

  return settings;
};

/**
 * Reads settings from persistent storage, returns default settings when
 * it's not possible, and replaces invalid keys with default values.
 */
export const getSettings = async (
  storage: IPersistentStorage,
): Promise<Settings> => {
  try {
    const serialised = await storage.getItem(STORAGE_KEY);

    return parseSettings(serialised);
  } catch (e) {
    console.warn("unable to read settings", e);

    return defaultSettings;
  }
};

/**
 * Saves settings in persisten storage.
 */
export const updateSettings = (
  storage: IPersistentStorage,
  settings: Settings,
): Promise<void> => storage.setItem(STORAGE_KEY, JSON.stringify(settings));
