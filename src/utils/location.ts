import { INetwork, NETWORK_TYPE_WIFI } from "../dependencies/Network";

/**
 * When a user connected to wifi treated as they are at home.
 */
export const isAtHome = async (network: INetwork): Promise<boolean> => {
  const status = await network.getNetworkStateAsync();

  return status.type === NETWORK_TYPE_WIFI;
};
