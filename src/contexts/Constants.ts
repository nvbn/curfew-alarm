import ExpoConstants from "expo-constants";
import { createContext } from "react";

import IConstants from "../dependencies/IConstants";

const Constants = createContext<IConstants>(ExpoConstants);

export default Constants;
