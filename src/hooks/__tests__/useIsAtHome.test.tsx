import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import { NetworkCtx } from "../../dependencies/Network";
import {
  makeNetworkAsAFailure,
  makeNetworkAsNotConnected,
  makeNetworkAsOnWifi,
} from "../../fakes/Network";
import { isReady } from "../../utils/future";
import useIsAtHome from "../useIsAtHome";

describe("useIsAtHome", () => {
  test("is at home when on wifi", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <NetworkCtx.Provider value={makeNetworkAsOnWifi()}>
        {children}
      </NetworkCtx.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(true);
  });

  test("is not at home when not on wifi", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <NetworkCtx.Provider value={makeNetworkAsNotConnected()}>
        {children}
      </NetworkCtx.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useIsAtHome(), {
      wrapper,
    });
    await waitForNextUpdate();

    expect(result.current).toBe(false);
  });

  test("the result future isn't ready if the call fails", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <NetworkCtx.Provider value={makeNetworkAsAFailure()}>
        {children}
      </NetworkCtx.Provider>
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
