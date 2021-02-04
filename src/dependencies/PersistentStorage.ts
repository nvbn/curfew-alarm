import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

/**
 * Interface to access device persistent storage.
 */
export interface IPersistentStorage {
  getItem(key: string): Promise<string | null>;

  setItem(key: string, value: string): Promise<void>;
}

export const PersistentStorageDefaultImpl: IPersistentStorage = AsyncStorage;

export const PersistentStorageCtx = createContext<IPersistentStorage>(
  PersistentStorageDefaultImpl,
);
