import * as ExpoNetwork from "expo-network";
import { createContext } from "react";

export const NETWORK_TYPE_WIFI = "WIFI";

/**
 * Interface that provides access to device network status.
 */
export interface INetwork {
  getNetworkStateAsync(): Promise<{
    type?: typeof NETWORK_TYPE_WIFI | unknown;
  }>;
}

export const NetworkDefaultImpl: INetwork = ExpoNetwork;

export const NetworkCtx = createContext<INetwork>(NetworkDefaultImpl);
