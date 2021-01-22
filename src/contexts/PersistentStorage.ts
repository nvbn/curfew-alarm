import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPersistentStorage from "../dependencies/IPersistentStorage";

const PersistentStorage = createContext<IPersistentStorage>(AsyncStorage);

export default PersistentStorage;
