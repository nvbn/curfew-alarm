export const NETWORK_TYPE_WIFI = "WIFI";

/**
 * Interface that provides access to device network status.
 */
export default interface INetwork {
  getNetworkStateAsync(): Promise<{
    type?: typeof NETWORK_TYPE_WIFI | unknown;
  }>;
}
