import { IPersistentStorage } from "../dependencies";
import { isValidTime, Time } from "./time";
import { isValidNumber } from "./numbers";

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

  if (!isValidNumber(settings.minutesToGoHome)) {
    console.warn(
      "incorrect value in minutesToGoHome",
      settings.minutesToGoHome,
    );
    settings.minutesToGoHome = defaultSettings.minutesToGoHome;
  }

  return settings;
};

export const getSettings = async (
  storage: IPersistentStorage,
): Promise<Settings> => {
  const serialised = await storage.getItem(STORAGE_KEY);

  return parseSettings(serialised);
};

export const updateSettings = (
  storage: IPersistentStorage,
  settings: Settings,
): Promise<void> => storage.setItem(STORAGE_KEY, JSON.stringify(settings));
