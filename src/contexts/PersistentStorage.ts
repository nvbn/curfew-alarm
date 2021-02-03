import { createContext } from "react";

import IPersistentStorage, {
  PersistentStorageDefaultImpl,
} from "../dependencies/IPersistentStorage";

const PersistentStorage = createContext<IPersistentStorage>(
  PersistentStorageDefaultImpl,
);

export default PersistentStorage;
