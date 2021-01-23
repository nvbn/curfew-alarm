import INetwork, { NETWORK_TYPE_WIFI } from "../dependencies/INetwork";

/**
 * Fake INetwork implementation with "connected to wifi" status.
 */
export const makeNetworkAsOnWifi = (): INetwork => ({
  async getNetworkStateAsync() {
    return { type: NETWORK_TYPE_WIFI };
  },
});

/**
 * Fake INetwork implementation with "no internet" status.
 */
export const makeNetworkAsNotConnected = (): INetwork => ({
  async getNetworkStateAsync() {
    return {};
  },
});

/**
 * Fake INetwork implementation that's always failing.
 */
export const makeNetworkAsAFailure = (): INetwork => ({
  async getNetworkStateAsync() {
    throw new Error("expected Network fake failure");
  },
});
