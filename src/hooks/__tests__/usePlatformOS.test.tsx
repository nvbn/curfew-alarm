import { renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import {
  IPlatform,
  PLATFORM_OS_ANDROID,
  PLATFORM_OS_IOS,
} from "../../dependencies/Platform";
import { makePlatformAndroid, makePlatformIOS } from "../../fakes/Plaftorm";
import Dependencies from "../../initialisers/Dependencies";
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
        <Dependencies platform={platform}>{children}</Dependencies>
      );

      const { result } = renderHook(() => usePlatformOS(), { wrapper });

      expect(result.current).toEqual(expectedPlatformOS);
    });
  }
});
