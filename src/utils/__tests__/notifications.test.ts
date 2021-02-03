import {
  NOTIFICATION_PERMISSIONS_DENIED,
  NOTIFICATIONS_PERMISSIONS_GRANTED,
  NOTIFICATIONS_PERMISSIONS_UNDETERMINED,
} from "../../dependencies/Notifications";
import {
  makeConstantsAsInEmulator,
  makeConstantsAsOnDevice,
} from "../../fakes/Constants";
import {
  makeNotificationsWithBehavior,
  NOTIFICATIONS_DEFAULT_FAKE_TOKEN,
} from "../../fakes/Notifications";
import { makePersistentStorageWithDataAndBehavior } from "../../fakes/PersistentStorage";
import { makePlatformAndroid, makePlatformIOS } from "../../fakes/Plaftorm";
import {
  NOTIFICATIONS_TOKEN_KEY,
  REGISTER_DENIED,
  REGISTER_NOT_DEVICE,
  REGISTER_OK,
  registerForPushNotifications,
} from "../notifications";

describe("registerForPushNotifications", () => {
  for (const platform of [makePlatformAndroid(), makePlatformIOS()]) {
    test(`can't register if it's not a real device on ${platform.OS}`, async () => {
      const storage = makePersistentStorageWithDataAndBehavior();

      const status = await registerForPushNotifications(
        makeConstantsAsInEmulator(),
        platform,
        makeNotificationsWithBehavior(),
        storage,
        false,
      );

      expect(status).toBe(REGISTER_NOT_DEVICE);

      const token = await storage.getItem(NOTIFICATIONS_TOKEN_KEY);
      expect(token).toBeNull();
    });

    test(`requests permissions the first time on ${platform.OS}`, async () => {
      const storage = makePersistentStorageWithDataAndBehavior();

      const status = await registerForPushNotifications(
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
        storage,
        false,
      );

      expect(status).toBe(REGISTER_OK);

      const token = await storage.getItem(NOTIFICATIONS_TOKEN_KEY);
      expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
    });

    test(`don't re-request permissions if not asked  on ${platform.OS}`, async () => {
      const storage = makePersistentStorageWithDataAndBehavior();

      const status = await registerForPushNotifications(
        makeConstantsAsOnDevice(),
        platform,
        makeNotificationsWithBehavior({
          getPermissionsAsync: Promise.resolve({
            status: NOTIFICATION_PERMISSIONS_DENIED,
          }),
        }),
        storage,
        false,
      );

      expect(status).toBe(REGISTER_DENIED);

      const token = await storage.getItem(NOTIFICATIONS_TOKEN_KEY);
      expect(token).toBeNull();
    });

    test(`re-request permissions if asked on ${platform.OS}`, async () => {
      const storage = makePersistentStorageWithDataAndBehavior();

      const status = await registerForPushNotifications(
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
        storage,
        true,
      );

      expect(status).toBe(REGISTER_OK);

      const token = await storage.getItem(NOTIFICATIONS_TOKEN_KEY);
      expect(token).toEqual(NOTIFICATIONS_DEFAULT_FAKE_TOKEN);
    });
  }
});
