import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

import IPersistentStorage from "../dependencies/IPersistentStorage";

const PersistentStorage = createContext<IPersistentStorage>(AsyncStorage);

export default PersistentStorage;
