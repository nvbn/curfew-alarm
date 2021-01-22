import { useCallback, useContext, useEffect, useState } from "react";
import PersistentStorage from "../contexts/PersistentStorage";
import { getSettings, Settings, updateSettings } from "../utils/settings";

const useSettings = (
  deps: unknown[] = [],
): [Settings | null, (change: Partial<Settings>) => void] => {
  const storage = useContext(PersistentStorage);

  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(
    () => {
      getSettings(storage)
        .then((parsed) => setSettings(parsed))
        .catch((e) => console.warn("unable to read settings", e));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSettings, ...deps],
  );

  const updateStorageContent = useCallback(
    (changes: Partial<Settings>): void => {
      if (settings === null) {
        console.warn("to early!");
        return;
      }

      const nextSettings = { ...settings, ...changes };

      setSettings(nextSettings);
      updateSettings(storage, nextSettings).catch((e) =>
        console.warn("unable to save settings", e),
      );
    },
    [storage, settings, setSettings],
  );

  return [settings, updateStorageContent];
};

export default useSettings;
