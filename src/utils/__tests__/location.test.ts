import {
  makeNetworkAsNotConnected,
  makeNetworkAsOnWifi,
} from "../../fakes/Network";
import { isAtHome } from "../location";

describe("isAtHome", () => {
  test("thinks that at home if on wifi", async () => {
    const network = makeNetworkAsOnWifi();
    const result = await isAtHome(network);

    expect(result).toBe(true);
  });

  test("thinks that away if no wifi", async () => {
    const network = makeNetworkAsNotConnected();
    const result = await isAtHome(network);

    expect(result).toBe(false);
  });
});
