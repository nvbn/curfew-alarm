/**
 * @jest-environment jsdom
 */
import React, { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react-hooks";
import Network from "../../contexts/Network";
import { isReady } from "../../utils/future";
import {
  makeNetworkAsAFailure,
  makeNetworkAsNotConnected,
  makeNetworkAsOnWifi,
} from "../../fakes/Network";
import useIsAtHome from "../useIsAtHome";

describe("useIsAtHome", () => {
  test("is at home when on wifi", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <Network.Provider value={makeNetworkAsOnWifi()}>
        {children}
      </Network.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(true);
  });

  test("is not at home when not on wifi", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <Network.Provider value={makeNetworkAsNotConnected()}>
        {children}
      </Network.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(false);
  });

  test("the result future isn't ready if the call fails", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <Network.Provider value={makeNetworkAsAFailure()}>
        {children}
      </Network.Provider>
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
