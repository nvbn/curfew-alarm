import { useCallback, useContext, useEffect, useState } from "react";
import PersistentStorage from "../contexts/PersistentStorage";
import { getSettings, Settings, updateSettings } from "../utils/settings";

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
    getSettings(storage)
      .then((parsed) => setSettings([true, parsed]))
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
      updateSettings(storage, nextSettings).catch((e) =>
        console.warn("unable to save settings", e),
      );
    },
    [isSettingsStorageReady, settings, setSettings],
  );

  if (!isSettingsStorageReady) {
    return [false, null, null];
  }

  return [true, settings!!, updateStorageContent];
};

export default useSettings;
