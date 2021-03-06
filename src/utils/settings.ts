import { IPersistentStorage } from "../dependencies/PersistentStorage";
import { isValidNumber } from "./numbers";
import { isValidTime, Time } from "./time";

export type Settings = {
  curfewStart: Time;
  curfewEnd: Time;
  minutesToGoHome: number;
  enabled: boolean;
  notificationsEnabled: boolean;
};

// exported only for tests
export const DEFAULT_SETTINGS: Settings = {
  curfewStart: { hour: 21, minute: 0 },
  curfewEnd: { hour: 4, minute: 30 },
  minutesToGoHome: 30,
  enabled: true,
  notificationsEnabled: true,
};

// exported only for tests
export const SETTINGS_STORAGE_KEY = "SETTINGS";

const parseSettings = (serialised: string | null): Settings => {
  let settings = DEFAULT_SETTINGS;
  if (serialised !== null) {
    try {
      settings = { ...settings, ...JSON.parse(serialised) };
    } catch (e) {
      console.warn("unable to decode settings", e);
    }
  }

  if (!isValidTime(settings.curfewStart)) {
    console.warn("incorrect value in curfewStart", settings.curfewStart);
    settings.curfewStart = DEFAULT_SETTINGS.curfewStart;
  }

  if (!isValidTime(settings.curfewEnd)) {
    console.warn("incorrect value in curfewEnd", settings.curfewEnd);
    settings.curfewEnd = DEFAULT_SETTINGS.curfewEnd;
  }

  if (
    !isValidNumber(settings.minutesToGoHome) ||
    settings.minutesToGoHome < 0
  ) {
    console.warn(
      "incorrect value in minutesToGoHome",
      settings.minutesToGoHome,
    );
    settings.minutesToGoHome = DEFAULT_SETTINGS.minutesToGoHome;
  }

  if (!(typeof settings.enabled === "boolean")) {
    settings.enabled = DEFAULT_SETTINGS.enabled;
  }

  if (!(typeof settings.notificationsEnabled === "boolean")) {
    settings.notificationsEnabled = DEFAULT_SETTINGS.notificationsEnabled;
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
    const serialised = await storage.getItem(SETTINGS_STORAGE_KEY);

    return parseSettings(serialised);
  } catch (e) {
    console.warn("unable to read settings", e);

    return DEFAULT_SETTINGS;
  }
};

/**
 * Saves settings in persisten storage.
 */
export const updateSettings = (
  storage: IPersistentStorage,
  settings: Settings,
): Promise<void> =>
  storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
