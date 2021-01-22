import { createContext } from "react";
import ExpoConstants from "expo-constants";
import IConstants from "../dependencies/IConstants";

const Constants = createContext<IConstants>(ExpoConstants);

export default Constants;
