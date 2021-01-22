import { createContext } from "react";
import * as Network from "expo-network";
import INetwork from "../dependencies/INetwork";

const NetworkStatus = createContext<INetwork>(Network);

export default NetworkStatus;
