import {
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../../dependencies/INotifications";
import {
  makeConstantsAsInEmulator,
  makeConstantsAsOnDevice,
} from "../../fakes/Constants";
import {
  makeNotificationsWithBehavior,
  NOTIFICATIONS_DEFAULT_FAKE_TOKEN,
} from "../../fakes/Notifications";
import { makePlatformAndroid, makePlatformIOS } from "../../fakes/Plaftorm";
import {
  REGISTER_DENIED,
  REGISTER_NOT_DEVICE,
  REGISTER_OK,
  registerForPushNotifications,
} from "../notifications";

describe("registerForPushNotifications", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can't register if it's not a real device on ${platform.OS}`, async () => {
      const { status } = await registerForPushNotifications(
        makeConstantsAsInEmulator(),
        platform,
        makeNotificationsWithBehavior(),
        false,
      );

      expect(status).toBe(REGISTER_NOT_DEVICE);
    });

    test(`requests permissions the first time on ${platform.OS}`, async () => {
      const { status, token } = await registerForPushNotifications(
        makeConstantsAsOnDevice(),
        platform,
        makeNotificationsWithBehavior({
          getPermissionsAsync: Promise.resolve({
            status: NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
          }),
          requestPermissionsAsync: Promise.resolve({
            status: NOTIFICATIONS_PERMISSIONS_GRANTED,
          }),
        }),
        false,
      );

      expect(status).toBe(REGISTER_OK);
      expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
    });

    test(`don't re-request permissions if not asked  on ${platform.OS}`, async () => {
      const { status } = await registerForPushNotifications(
        makeConstantsAsOnDevice(),
        platform,
        makeNotificationsWithBehavior({
          getPermissionsAsync: Promise.resolve({
            status: NOTIFICATION_PERMISSIONS_DENIED,
          }),
        }),
        false,
      );

      expect(status).toBe(REGISTER_DENIED);
    });

    test(`re-request permissions if asked on ${platform.OS}`, async () => {
      const { status, token } = await registerForPushNotifications(
        makeConstantsAsOnDevice(),
        platform,
        makeNotificationsWithBehavior({
          getPermissionsAsync: Promise.resolve({
            status: NOTIFICATION_PERMISSIONS_DENIED,
          }),
          requestPermissionsAsync: Promise.resolve({
            status: NOTIFICATIONS_PERMISSIONS_GRANTED,
          }),
        }),
        true,
      );

      expect(status).toBe(REGISTER_OK);
      expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
    });
  }
});
