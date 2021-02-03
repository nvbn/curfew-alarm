import { act, renderHook } from "@testing-library/react-hooks";
import React, { PropsWithChildren } from "react";

import {
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../../dependencies/Notifications";
import {
  makeConstantsAsInEmulator,
  makeConstantsAsOnDevice,
} from "../../fakes/Constants";
import { makeNotificationsWithBehavior } from "../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../fakes/Plaftorm";
import Dependencies from "../../initialisers/Dependencies";
import { isReady } from "../../utils/future";
import useNotifications from "../useNotifications";

describe("useNotifications", () => {
  for (const platform of [makePlatformIOS(), makePlatformAndroid()]) {
    test(`returns not ok when in emulator on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsInEmulator()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior()}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed] = result.current;

      expect(isReady(isAllowed)).toBe(true);
      expect(isAllowed).toBe(false);
    });

    test(`returns not ok when failed on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsOnDevice()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior({
            getPermissionsAsync: Promise.reject(new Error("expected error")),
          })}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed] = result.current;

      expect(isReady(isAllowed)).toBe(true);
      expect(isAllowed).toBe(false);
    });

    test(`returns ok if the configuration succeed on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsOnDevice()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior()}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed] = result.current;
      expect(isAllowed).toBe(true);
    });

    test(`asks for permission and returns ok if configuration succeed on the first open on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsOnDevice()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior({
            getPermissionsAsync: Promise.resolve({
              status: NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
            }),
          })}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed] = result.current;
      expect(isAllowed).toBe(true);
    });

    test(`returns not ok when denied, but allows to re-request permissions and then returns ok on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsOnDevice()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior({
            getPermissionsAsync: Promise.resolve({
              status: NOTIFICATION_PERMISSIONS_DENIED,
            }),
            requestPermissionsAsync: Promise.resolve({
              status: NOTIFICATIONS_PERMISSIONS_GRANTED,
            }),
          })}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed, request] = result.current;
      expect(isAllowed).toBe(false);

      await act(request);
      await waitForNextUpdate();

      const [nextIsAllowed] = result.current;
      expect(nextIsAllowed).toBe(true);
    });

    test(`stays not ok if the re-request failed on ${platform.OS}`, async () => {
      const wrapper = ({
        children,
      }: PropsWithChildren<unknown>): JSX.Element => (
        <Dependencies
          constants={makeConstantsAsOnDevice()}
          platform={platform}
          persistentStorage={makePersistentStorageWithDataAndBehavior()}
          notifications={makeNotificationsWithBehavior({
            getPermissionsAsync: Promise.resolve({
              status: NOTIFICATION_PERMISSIONS_DENIED,
            }),
            requestPermissionsAsync: Promise.reject(
              new Error("expected error"),
            ),
          })}
        >
          {children}
        </Dependencies>
      );

      const { result, waitForNextUpdate } = renderHook(
        () => useNotifications(),
        { wrapper },
      );
      await waitForNextUpdate();

      const [isAllowed, request] = result.current;
      expect(isAllowed).toBe(false);

      await act(request);
      await waitForNextUpdate();

      const [nextIsAllowed] = result.current;
      console.warn(result.current);
      expect(nextIsAllowed).toBe(false);
    });
  }
});
