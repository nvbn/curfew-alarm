import { createContext } from "react";
import * as Network from "expo-network";
import { INetwork } from "../dependencies";

const NetworkStatus = createContext<INetwork>(Network);

export default NetworkStatus;
