import { createContext } from "react";
import * as ExpoNetwork from "expo-network";
import INetwork from "../dependencies/INetwork";

const Network = createContext<INetwork>(ExpoNetwork);

export default Network;
