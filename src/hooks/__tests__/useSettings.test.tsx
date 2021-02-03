import { act, renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import { PersistentStorageCtx } from "../../dependencies/PersistentStorage";
import { makePersistentStorageWithDataAndBehavior } from "../../fakes/PersistentStorage";
import { DEFAULT_SETTINGS } from "../../utils/settings";
import useSettings from "../useSettings";

describe("useSettings", () => {
  test("provides access to settings", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <PersistentStorageCtx.Provider
        value={makePersistentStorageWithDataAndBehavior()}
      >
        {children}
      </PersistentStorageCtx.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSettings(), {
      wrapper,
    });
    await waitForNextUpdate();

    const [settings] = result.current;
    expect(settings).toEqual(DEFAULT_SETTINGS);
  });

  test("allows to partially modify settings", async () => {
    const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
      <PersistentStorageCtx.Provider
        value={makePersistentStorageWithDataAndBehavior()}
      >
        {children}
      </PersistentStorageCtx.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSettings(), {
      wrapper,
    });
    await waitForNextUpdate();

    const [, updateSettings] = result.current;
    await act(() => updateSettings({ minutesToGoHome: 99 }));
    await waitForNextUpdate();

    const [settings] = result.current;
    expect(settings).toEqual({ ...DEFAULT_SETTINGS, minutesToGoHome: 99 });
  });
});
