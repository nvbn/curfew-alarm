import { createContext } from "react";
import * as rn from "react-native";
import { IPlatform } from "../dependencies";

const Platform = createContext<IPlatform>(rn.Platform);

export default Platform;
