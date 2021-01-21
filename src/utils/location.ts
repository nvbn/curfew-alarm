import { INetwork } from "../dependencies";

export const isAtHome = async (network: INetwork): Promise<boolean> => {
  const status = await network.getNetworkStateAsync();

  return status.type === "WIFI";
};
