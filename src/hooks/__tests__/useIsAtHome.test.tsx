/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import Network from "../../contexts/Network";
import { NETWORK_TYPE_WIFI } from "../../dependencies/INetwork";
import useIsAtHome from "../useIsAtHome";
import { isReady } from "../../utils/future";

describe("useIsAtHome", () => {
  test("is at home when on wifi", async () => {
    const network = {
      async getNetworkStateAsync(): Promise<any> {
        return { type: NETWORK_TYPE_WIFI };
      },
    };
    const wrapper = ({ children }: any) => (
      <Network.Provider value={network}>{children}</Network.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(true);
  });

  test("is not at home when not on wifi", async () => {
    const network = {
      async getNetworkStateAsync(): Promise<any> {
        return {};
      },
    };
    const wrapper = ({ children }: any) => (
      <Network.Provider value={network}>{children}</Network.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(false);
  });

  test("the result future isn't ready if the call fails", async () => {
    const network = {
      async getNetworkStateAsync(): Promise<any> {
        throw new Error("expected error");
      },
    };
    const wrapper = ({ children }: any) => (
      <Network.Provider value={network}>{children}</Network.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    try {
      await waitForNextUpdate();
    } catch (e) {
      if (e.toString().indexOf("Timed out") === -1) {
        throw e;
      }
    }

    expect(isReady(result.current)).toBe(false);
  });
});
