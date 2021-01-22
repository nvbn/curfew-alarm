/* eslint-disable @typescript-eslint/no-explicit-any */
import { NETWORK_TYPE_WIFI } from "../../dependencies/INetwork";
import { isAtHome } from "../location";

describe("isAtHome", () => {
  test("thinks that at home if on wifi", async () => {
    const network = {
      async getNetworkStateAsync(): Promise<any> {
        return { type: NETWORK_TYPE_WIFI };
      },
    };

    const result = await isAtHome(network);

    expect(result).toBe(true);
  });

  test("thinks that away if no wifi", async () => {
    const network = {
      async getNetworkStateAsync(): Promise<any> {
        return {};
      },
    };

    const result = await isAtHome(network);

    expect(result).toBe(false);
  });
});
