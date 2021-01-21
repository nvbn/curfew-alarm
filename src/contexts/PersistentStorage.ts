import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IPersistentStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

const PersistentStorage = createContext<IPersistentStorage>(AsyncStorage);

export default PersistentStorage;
