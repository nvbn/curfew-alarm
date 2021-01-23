import * as ExpoNetwork from "expo-network";
import { createContext } from "react";

import INetwork from "../dependencies/INetwork";

const Network = createContext<INetwork>(ExpoNetwork);

export default Network;
