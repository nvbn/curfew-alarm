import { INetwork } from "../../dependencies";
import { isAtHome } from "../location";

describe("isAtHome", () => {
  test("thinks that at home if on wifi", async () => {
    const network: INetwork = {
      async getNetworkStateAsync(): Promise<{ type?: "WIFI" | unknown }> {
        return { type: "WIFI" };
      },
    };

    const result = await isAtHome(network);

    expect(result).toBe(true);
  });

  test("thinks that away if no wifi", async () => {
    const network: INetwork = {
      async getNetworkStateAsync(): Promise<{ type?: unknown }> {
        return {};
      },
    };

    const result = await isAtHome(network);

    expect(result).toBe(false);
  });
});
