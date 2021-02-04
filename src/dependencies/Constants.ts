import ExpoConstants from "expo-constants";
import { createContext } from "react";

/**
 * Interface that provides access to runtime constants.
 */
export interface IConstants {
  isDevice: boolean;
}

export const ConstantsDefaultImpl: IConstants = ExpoConstants;

export const ConstantsCtx = createContext<IConstants>(ConstantsDefaultImpl);
