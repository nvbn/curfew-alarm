import { createContext } from "react";
import ExpoConstants from "expo-constants";
import { IConstants } from "../dependencies";

const Constants = createContext<IConstants>(ExpoConstants);

export default Constants;
