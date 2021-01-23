import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import Platform from "../../contexts/Platform";
import IPlatform, {
  PLATFORM_OS_ANDROID,
  PLATFORM_OS_IOS,
} from "../../dependencies/IPlatform";
import { makePlatformAndroid, makePlatformIOS } from "../../fakes/Plaftorm";
import usePlatformOS from "../usePlatformOS";

describe("usePlatformOS", () => {
  for (const [platform, expectedPlatformOS] of [
    [makePlatformIOS(), PLATFORM_OS_IOS],
    [makePlatformAndroid(), PLATFORM_OS_ANDROID],
  ] as [IPlatform, string][]) {
    test(`returns ${expectedPlatformOS} on ${JSON.stringify(platform)}`, () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Platform.Provider value={platform}>{children}</Platform.Provider>
      );

      const { result } = renderHook(() => usePlatformOS(), { wrapper });

      expect(result.current).toEqual(expectedPlatformOS);
    });
  }
});
