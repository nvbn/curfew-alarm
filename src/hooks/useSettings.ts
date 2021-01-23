import { useCallback, useContext, useEffect, useState } from "react";

import PersistentStorage from "../contexts/PersistentStorage";
import { Future, FUTURE_NOT_READY, isReady } from "../utils/future";
import { getSettings, Settings, updateSettings } from "../utils/settings";

/**
 * Provides access and allows to modify settings.
 */
const useSettings = (
  deps: unknown[] = [],
): [Future<Settings>, (change: Partial<Settings>) => void] => {
  const storage = useContext(PersistentStorage);

  const [settings, setSettings] = useState<Future<Settings>>(FUTURE_NOT_READY);

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
      if (!isReady(settings)) {
        console.warn("too early!");
        return;
      }

      const nextSettings = { ...settings, ...changes };
      updateSettings(storage, nextSettings)
        .then(() => setSettings(nextSettings))
        .catch((e) => console.warn("unable to save settings", e));
    },
    [storage, settings, setSettings],
  );

  return [settings, updateStorageContent];
};

export default useSettings;
