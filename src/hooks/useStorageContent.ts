import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Time } from "../types";

export type StorageContent = {
  curfewStart: Time;
  curfewEnd: Time;

  minutesToGoHome: number;
};

const defaultContent: StorageContent = {
  curfewStart: { hour: 20, minute: 30 },
  curfewEnd: { hour: 4, minute: 30 },
  minutesToGoHome: 30,
};

const STORAGE_KEY = "APP_CONTENT";

type ReadyStorage = [
  true,
  StorageContent,
  (change: Partial<StorageContent>) => void,
];

type InitialisingStorage = [false, null, null];

const useStorageContent = (): ReadyStorage | InitialisingStorage => {
  const [[ready, state], setState] = useState<
    [true, StorageContent] | [false, null]
  >([false, null]);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      let content = defaultContent;
      if (value !== null) {
        try {
          content = { ...content, ...JSON.parse(value) };
        } catch (e) {
          console.warn("unable to decode storage data", e);
        }
      }

      setState([true, content]);
    });
  }, [setState]);

  const updateStorageContent = useCallback(
    (change: Partial<StorageContent>): void => {
      if (!ready) {
        console.warn("to early!");
        return;
      }

      const nextContent = { ...state!!, ...change };

      setState([true, nextContent]);
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextContent),
      ).catch((e) => console.warn("unable to save to storage", e));
    },
    [ready, state, setState],
  );

  if (!ready) {
    return [false, null, null];
  }

  return [true, state!!, updateStorageContent];
};

export default useStorageContent;
